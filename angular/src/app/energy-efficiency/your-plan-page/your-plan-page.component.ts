import {Component, OnInit} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {LocalAuthorityService} from '../../shared/local-authority-service/local-authority.service';
import {LocalAuthority} from '../../shared/local-authority-service/local-authority';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {LocalAuthorityGrant} from '../../grants/model/local-authority-grant';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import * as logger from 'loglevel';
import {RoundingService} from '../../shared/rounding-service/rounding.service';
import {TenureType} from '../../questionnaire/questions/tenure-type-question/tenure-type';
import {EnergyEfficiencyRecommendationService} from "../../shared/recommendations-service/energy-efficiency-recommendation.service";
import Config from '../../config';

@Component({
    selector: 'app-your-plan-page',
    templateUrl: './your-plan-page.component.html',
    styleUrls: ['./your-plan-page.component.scss']
})
export class YourPlanPageComponent implements OnInit {

    get recommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getRecommendationsInPlan();
    }

    get userRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getUserRecommendationsInPlan();
    }

    get landlordRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.recommendationsService.getLandlordRecommendationsInPlan();
    }

    localAuthorityGrants: LocalAuthorityGrant[] = [];
    localAuthorityName: string;
    isError: boolean = false;
    errorMessage: string;

    private readonly downloadLandlordPlanEndpoint = Config().apiRoot + '/plan/download';

    constructor(private recommendationsService: RecommendationsService,
                private localAuthorityService: LocalAuthorityService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private responseData: ResponseData) {
    }

    ngOnInit() {
        if (!this.recommendations.length) {
            this.errorMessage = "Sorry, we can't show you your plan at the moment " +
                "as it seems that you have not completed the questionnaire, " +
                "or something has gone wrong.";
            this.isError = true;
            return;
        }

        this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode)
            .subscribe(
                response => this.handleLocalAuthorityServiceResponse(response),
                error => this.handleLocalAuthorityServiceError(error)
            );
    }

    get showMonthlySavings() {
        return this.responseData.tenureType !== TenureType.OwnerOccupancy;
    }

    getRoundedInvestment(recommendation: EnergyEfficiencyRecommendation) {
        return RoundingService.roundCostValue(recommendation.investmentPounds);
    }

    getSavingDisplay(recommendation: EnergyEfficiencyRecommendation) {
        return EnergyEfficiencyRecommendationService.getSavingDisplay(recommendation, this.showMonthlySavings);
    }

    handleLocalAuthorityServiceResponse(response: LocalAuthority) {
        this.localAuthorityGrants = response.grants;
        this.localAuthorityName = response.name;
    }

    handleLocalAuthorityServiceError(err: Error) {
        logger.error(err.message);
    }

    sendEventToAnalytics(eventName: string, eventLabel?: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'plan-page', eventLabel);
    }
}
