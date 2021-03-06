import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {UserJourneyType} from '../../shared/response-data/user-journey-type';
import {LocalAuthorityService} from '../../shared/local-authority-service/local-authority.service';
import {LocalAuthority} from '../../shared/local-authority-service/local-authority';
import {PostcodeDetails} from "../../shared/postcode-epc-service/model/postcode-details";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

@Component({
    selector: 'app-grants-landing-page',
    templateUrl: './grants-landing-page.component.html',
    styleUrls: ['./grants-landing-page.component.scss']
})
export class GrantsLandingPageComponent implements OnInit {

    localAuthority: LocalAuthority = null;
    isLoading: boolean = false;
    isError: boolean = false;

    constructor(private localAuthorityService: LocalAuthorityService,
                private responseData: ResponseData,
                private pageTitle: PageTitleService) {
    }

    ngOnInit(): void {
        this.pageTitle.set('Home energy grants');
    }

    setJourneyTypeToBoiler(): void {
        this.responseData.userJourneyType = UserJourneyType.Boiler;
    }

    setJourneyTypeToHomeImprovements(): void {
        this.responseData.userJourneyType = UserJourneyType.PlanHomeImprovements;
    }

    onPostcodeSelected(postcodeDetails: PostcodeDetails) {
        if (!postcodeDetails.localAuthorityCode) {
            this.localAuthority = null;
            return;
        }

        this.isLoading = true;
        this.isError = false;
        this.localAuthorityService.fetchLocalAuthorityDetails(postcodeDetails.localAuthorityCode)
            .subscribe(localAuthority => {
                    this.isLoading = false;
                    this.localAuthority = localAuthority;
                },
                () => {
                    this.isLoading = false;
                    this.isError = true;
                });
    }

    scrollTo(el: HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}
