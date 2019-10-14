package uk.gov.beis.dceas.service;

import org.jooq.DSLContext;
import org.jooq.Record;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import uk.gov.beis.dceas.api.LocalAuthority;
import uk.gov.beis.dceas.api.PostcodesResponse;
import uk.gov.beis.dceas.db.gen.tables.WpPostmeta;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static java.lang.String.format;
import static java.lang.String.join;
import static org.jooq.impl.DSL.inline;
import static org.jooq.impl.DSL.query;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTMETA;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTS;

/**
 * Code relating to checking the Local Authorities by example postcodes against http://postcodes.io/
 */
@Service
public class LocalAuthoritiesCheckService {

    private final RestTemplate httpClient;
    private final String postcodesUrl;
    private final DSLContext database;
    private final JavaMailSender emailSender;
    private final String supportEmail;
    private final String environment;

    @Autowired
    public LocalAuthoritiesCheckService(
        RestTemplateBuilder httpClientBuilder,
        @Value("${dceas.postcodes-url}") String postcodesUrl,
        DSLContext database,
        JavaMailSender emailSender,
        @Value("${dceas.local-authorities-support-email}") String supportEmail,
        @Value("${info.environment}") String environment) {

        this.httpClient = httpClientBuilder.build();
        this.postcodesUrl = postcodesUrl;
        this.database = database;
        this.emailSender = emailSender;
        this.supportEmail = supportEmail;
        this.environment = environment.toUpperCase();
    }

    public void checkLocalAuthorities() throws RestClientException, MessagingException {
        Map<String, LocalAuthority> localAuthorityByPostcode = getLocalAuthorityByPostcode();
        if (localAuthorityByPostcode.isEmpty()) {
            // No example postcodes provided.
            return;
        }

        PostcodesResponse response = getPostcodesResponse(localAuthorityByPostcode.keySet());
        if (response == null || response.getStatus() != 200) {
            String messageBody = format("%s was received from %s when searching for the following postcodes:\n\n%s",
                    response == null ? "No response" : format("A %d response", response.getStatus()),
                    postcodesUrl,
                    join(", ", localAuthorityByPostcode.keySet()));
            sendFailureEmail(messageBody);
            return;
        }

        List<String> mismatches = new ArrayList<>();
        for (PostcodesResponse.QueryResult queryResult : response.getResult()) {
            String queryPostcode = queryResult.getQuery();
            LocalAuthority localAuthority = localAuthorityByPostcode.get(queryPostcode);
            PostcodesResponse.QueryResult.Postcode postcodeResult = queryResult.getResult();
            if (!isMatch(localAuthority, postcodeResult)) {
                mismatches.add(buildMismatchString(queryPostcode, localAuthority, postcodeResult));
            }
        }

        if (!mismatches.isEmpty()) {
            String messageBody = "The following mismatches were found when checking against example postcodes:\n" +
                "\n" +
                String.join("\n\n", mismatches) + "\n" +
                "\n" +
                "These may be caused by bad data in the example postcodes, or a change in local authority codes.\n" +
                "\n" +
                "The mismatches should be corrected in the " + environment + " admin site.";
            sendFailureEmail(messageBody);
        }
    }

    private Map<String, LocalAuthority> getLocalAuthorityByPostcode() {
        final WpPostmeta postMetaForExamplePostcode = WP_POSTMETA.as("post_meta_for_example_postcode");
        final WpPostmeta postMetaForCode = WP_POSTMETA.as("post_meta_for_code");
        final WpPostmeta postMetaForDisplayName = WP_POSTMETA.as("post_meta_for_display_name");

        Record[] localAuthorityPosts = database
            .select(
                postMetaForExamplePostcode.META_VALUE,
                postMetaForCode.META_VALUE,
                postMetaForDisplayName.META_VALUE)
            .from(WP_POSTS)
            .join(postMetaForExamplePostcode).on(
                postMetaForExamplePostcode.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForExamplePostcode.META_KEY.eq(inline("example_postcode"))))
            .leftJoin(postMetaForCode).on(
                postMetaForCode.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForCode.META_KEY.eq(inline("local_authority_code"))))
            .leftJoin(postMetaForDisplayName).on(
                postMetaForDisplayName.POST_ID.eq(WP_POSTS.ID)
                    .and(postMetaForDisplayName.META_KEY.eq(inline("display_name"))))
            .where(WP_POSTS.POST_TYPE.eq(inline("local_authority")))
            .and(WP_POSTS.POST_STATUS.eq(inline("publish")))
            .fetchArray();

        return Arrays.stream(localAuthorityPosts)
            .collect(Collectors.toMap(
                postMetaForExamplePostcode.META_VALUE::get,
                post -> new LocalAuthority(
                    postMetaForCode.META_VALUE.get(post),
                    postMetaForDisplayName.META_VALUE.get(post),
                    postMetaForExamplePostcode.META_VALUE.get(post),
                    null
                )));
    }

    private PostcodesResponse getPostcodesResponse(Set<String> postcodes) {
        Map<String, Object> postBody = new HashMap<>();
        postBody.put("postcodes", postcodes);
        return httpClient.postForObject(postcodesUrl, postBody, PostcodesResponse.class);
    }

    private Boolean isMatch(LocalAuthority localAuthority, PostcodesResponse.QueryResult.Postcode postcodeResult) {
        if (postcodeResult == null) {
            return false;
        }
        return localAuthority.getDisplayName().equals(postcodeResult.getAdminDistrict())
            && localAuthority.getLocalAuthorityCode().equals(postcodeResult.getCodes().getAdminDistrict());
    }

    private void sendFailureEmail(String messageBody) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false);
        helper.setTo(supportEmail);
        helper.setFrom("no-reply@simpleenergyadvice.org.uk");
        helper.setSubject(format("[Simple Energy Advice - %s] Local authority check failed", environment));
        String text =
            "The local authority codes check failed for the Simple Energy Advice " + environment + " environment.\n" +
            "\n" +
            messageBody;
        helper.setText(text);
        emailSender.send(message);
    }

    private String buildMismatchString(
        String queryPostcode,
        LocalAuthority localAuthority,
        PostcodesResponse.QueryResult.Postcode postcodeResult) {
        return format("EXPECTED: %s\nACTUAL: %s\nThe example postcode given for %s was %s.",
            formatLocalAuthority(localAuthority.getDisplayName(), localAuthority.getLocalAuthorityCode()),
            postcodeResult == null ? "null" : formatLocalAuthority(postcodeResult.getAdminDistrict(), postcodeResult.getCodes().getAdminDistrict()),
            localAuthority.getDisplayName(),
            queryPostcode);
    }

    private String formatLocalAuthority(String name, String code) {
        return format("%s (%s)", name, code);
    }
}
