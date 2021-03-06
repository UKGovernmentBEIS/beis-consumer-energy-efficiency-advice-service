package uk.gov.beis.dceas.service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.jooq.DSLContext;
import org.springframework.stereotype.Service;
import uk.gov.beis.dceas.api.NationalGrant;
import uk.gov.beis.dceas.spring.exception.NotFoundException;

import javax.annotation.Nonnull;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import static com.google.common.base.Preconditions.checkArgument;
import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toMap;
import static org.jooq.impl.DSL.inline;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTMETA;
import static uk.gov.beis.dceas.db.gen.Tables.WP_POSTS;
import static uk.gov.beis.dceas.service.AcfDataTranslator.deserializePhpStringArrayOfInts;
import static uk.gov.beis.dceas.service.AcfDataTranslator.getAcfRepeaterList;
import static uk.gov.beis.dceas.service.AcfDataTranslator.toBool;

@Service
public class NationalGrantsService {

    private static final Object KEY = new Object();
    private final DSLContext dslContext;
    /**
     * We lean on Guava to give us a simple thread-safe expiring cache for the whole table
     * (with coalescing reads on expiry)
     */
    private final LoadingCache<Object, Map<String, NationalGrant>> grantsBySlugCache =
            CacheBuilder.newBuilder()
                    .expireAfterWrite(1, TimeUnit.HOURS)
                    .build(new GrantsBySlugFetcher());

    public NationalGrantsService(DSLContext dslContext) {
        this.dslContext = dslContext;
    }

    /**
     * Returns all NationalGrants
     */
    public Collection<NationalGrant> list() throws Exception {
        return grantsBySlugCache.get(KEY).values();
    }

    @Nonnull
    public NationalGrant get(String slug) {
        try {
            return NotFoundException.notFoundIfNull(
                    grantsBySlugCache.get(KEY).get(slug));
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
    }

    private class GrantsBySlugFetcher extends CacheLoader<Object, Map<String, NationalGrant>> {

        @Override
        public Map<String, NationalGrant> load(Object key) throws Exception {
            checkArgument(key == KEY);

            // The schema is ugly here, because it was created by ACF, a Wordpress plugin
            // that hacks custom fields into WP by encoding them as posts and post_meta.
            // It would be nice to throw this away and redo as a real database table.
            //
            // The WP PHP code takes 10+ database round trips to read a single entity in
            // this format.
            //
            // The list fields have a crazy double-indirection database format in ACF, where
            // the meta field "advantages" stores a length field like "2" and then 0 or more
            // secondary meta fields store the list items, like "advantages_0_advantage".
            // We need to fetch the whole "meta" map to avoid a really crazy multi-join.

            Map<String, Map<String, String>> postMetaFieldsByPostName = dslContext
                    .select(
                            WP_POSTS.POST_NAME,
                            WP_POSTMETA.META_KEY,
                            WP_POSTMETA.META_VALUE)
                    .from(WP_POSTS)
                    .leftJoin(WP_POSTMETA).onKey()
                    .where(WP_POSTS.POST_TYPE.eq(inline("national_grant")))
                    .and(WP_POSTS.POST_STATUS.eq(inline("publish")))
                    .orderBy(WP_POSTS.POST_DATE.desc(), WP_POSTS.POST_NAME.asc())
                    .fetchStream()
                    .collect(
                            toMap(
                                    r -> r.get(WP_POSTS.POST_NAME),
                                    r -> {
                                        Map<String, String> m = new HashMap<>();
                                        m.put(r.get(WP_POSTMETA.META_KEY), r.get(WP_POSTMETA.META_VALUE));
                                        return m;
                                    },
                                    (map1, map2) -> {
                                        map1.putAll(map2);
                                        return map1;
                                    },
                                    LinkedHashMap::new));

            return postMetaFieldsByPostName.entrySet().stream()
                    .map(e -> {
                        String postName = e.getKey();
                        Map<String, String> metaFields = e.getValue();

                        boolean linkToMeasures = toBool(metaFields.get("link_to_measures"));

                        List<String> linkedMeasureCodes;
                        // Although the ACF "measures" list is conditional on "link_to_measures",
                        // the former list is not cleared in the database when the latter is set to
                        // false. To prevent sending stale data, we must guard against that here
                        if (!linkToMeasures) {
                            linkedMeasureCodes = emptyList();
                        } else {
                            // This is 1+N database round-trips, but it is no worse than WP.
                            // The output is cached above
                            linkedMeasureCodes = getMeasureCodesFromIds(
                                    deserializePhpStringArrayOfInts(metaFields.get("measures")));
                        }

                        return NationalGrant.builder()
                                .heading(metaFields.get("heading"))
                                .description(metaFields.get("description"))
                                .linkToMeasures(linkToMeasures)
                                .displayWithoutMeasures(toBool(metaFields.get("display_without_measures")))
                                .findOutMoreLink(metaFields.get("find_out_more_link"))
                                .advantages(getAcfRepeaterList(metaFields, "advantages", a -> a.get("advantage")))
                                .steps(getAcfRepeaterList(metaFields, "steps", this::stepFromFields))
                                .linkedMeasureCodes(linkedMeasureCodes)
                                .slug(postName)
                                .build();
                    })
                    .collect(toMap(
                            g -> g.getSlug(),
                            g -> g));
        }

        private List<String> getMeasureCodesFromIds(List<Integer> measureIds) {
            if (measureIds == null || measureIds.isEmpty()) {
                return emptyList();
            }

            Map<Integer, String> codesById = dslContext
                    .select(
                            WP_POSTMETA.POST_ID,
                            WP_POSTMETA.META_VALUE)
                    .from(WP_POSTS)
                    .join(WP_POSTMETA).onKey()
                    .where(WP_POSTMETA.META_KEY.eq(inline("measure_code")))
                    .and(WP_POSTMETA.POST_ID.in(measureIds))
                    .and(WP_POSTS.POST_STATUS.eq(inline("publish")))
                    .fetchMap(WP_POSTMETA.POST_ID, WP_POSTMETA.META_VALUE);

            return measureIds.stream()
                    .map(codesById::get)
                    .collect(toList());
        }

        private NationalGrant.Step stepFromFields(Map<String, String> fields) {
            return NationalGrant.Step.builder()
                    .headline(fields.get("headline"))
                    .description(fields.get("description"))
                    .moreInfoLinks(getAcfRepeaterList(fields, "more_info_links", linkFields ->
                            NationalGrant.Link.builder()
                                    .buttonText(linkFields.get("button_text"))
                                    .linkUrl(linkFields.get("link_url"))
                                    .build()))
                    .build();
        }
    }
}
