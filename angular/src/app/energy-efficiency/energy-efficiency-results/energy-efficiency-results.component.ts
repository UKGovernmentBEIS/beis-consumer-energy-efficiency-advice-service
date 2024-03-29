import {Component, OnInit} from '@angular/core';
import {EnergyCalculationApiService} from '../../shared/energy-calculation-api-service/energy-calculation-api-service';
import {isComplete, ResponseData} from '../../shared/response-data/response-data';
import {EnergyCalculationResponse} from '../../shared/energy-calculation-api-service/response/energy-calculation-response';
import {EnergyCalculations} from './energy-calculations';
import 'rxjs/add/observable/forkJoin';
import sumBy from 'lodash-es/sumBy';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {RdSapInput} from '../../shared/energy-calculation-api-service/request/rdsap-input';
import {UserStateService} from '../../shared/user-state-service/user-state-service';
import {TenureType} from '../../questionnaire/questions/tenure-type-question/tenure-type';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import {AbTestingService} from '../../shared/analytics/ab-testing.service';
import {getFuelTypeDescription} from "../../questionnaire/questions/fuel-type-question/fuel-type";
import {getHomePropertyDescription} from "../../shared/home-property-description-helper/home-property-description-helper";
import {EnergyEfficiencyRecommendations} from "../../shared/recommendations-service/energy-efficiency-recommendations";
import {EnergyEfficiencyDisplayService} from "../../shared/energy-efficiency-display-service/energy-efficiency-display.service";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

@Component({
    selector: 'app-energy-efficiency-results-page',
    templateUrl: './energy-efficiency-results.component.html',
    styleUrls: ['./energy-efficiency-results.component.scss']
})
export class EnergyEfficiencyResultsComponent implements OnInit {

    energyCalculations: EnergyCalculations;

    isLoading: boolean = true;
    isError: boolean = false;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";
    showDefaultRecommendation: boolean = false;
    showDefaultRentalMeasures: boolean = false;
    defaultRecommendationDisclaimer: string;
    isEditing: boolean = false;

    private allRecommendations: EnergyEfficiencyRecommendations = new EnergyEfficiencyRecommendations();

    private readonly LANDLORD_RECOMMENDATION_FEATURE_FLAG: boolean = true;

    constructor(private responseData: ResponseData,
                private recommendationsService: RecommendationsService,
                private energyCalculationService: EnergyCalculationApiService,
                private userStateService: UserStateService,
                private googleAnalyticsService: GoogleAnalyticsService,
                private abTestingService: AbTestingService,
                private energyEfficiencyDisplayService: EnergyEfficiencyDisplayService,
                private pageTitle: PageTitleService) {
    }

    ngOnInit() {
        this.pageTitle.set('Energy efficiency results');

        if (!isComplete(this.responseData)) {
            this.errorMessage = "Sorry, we can't show you results as it seems that you have " +
                "not completed the questionnaire, or something has gone wrong.";
            this.isError = true;
            return;
        }

        this.energyCalculationService.fetchEnergyCalculation(new RdSapInput(this.responseData))
            .subscribe(energyCalculationResponse => {
                this.recommendationsService.getAllRecommendations(energyCalculationResponse)
                    .subscribe(allRecommendations =>
                        this.onLoadingComplete(allRecommendations, energyCalculationResponse),
                        err => this.handleRecommendationError(err)
                    );
                },
                err => this.handleRecommendationError(err)
            );

        this.userStateService.saveState();
        this.isEditing = this.recommendationsService.hasRecommendationsInPlan;
    }

    getUserRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.allRecommendations.userRecommendations;
    }

    getLandlordRecommendations(): EnergyEfficiencyRecommendation[] {
        return this.allRecommendations.landlordRecommendations;
    }

    get isOwnerOccupied() {
        return this.responseData.tenureType === TenureType.OwnerOccupancy;
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'results-page');
    }

    get combinedLandlordRecommendationHeadline(): string {
        return this.energyEfficiencyDisplayService.getCombinedLandlordRecommendationHeadline();
    }

    shouldShowLandlordRecommendation(): boolean {
        return this.LANDLORD_RECOMMENDATION_FEATURE_FLAG;
    }

    private displayErrorMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    private onRecommendationInPlanChanged(): void {
        this.recommendationsService.updateSessionRecommendations();
    }

    private onLoadingComplete(
        allRecommendations: EnergyEfficiencyRecommendations,
        energyCalculationResponse: EnergyCalculationResponse
    ) {
        this.allRecommendations = allRecommendations;
        this.energyCalculations = EnergyEfficiencyResultsComponent.getEnergyCalculations(
            energyCalculationResponse,
            this.allRecommendations.userRecommendations
        );
        this.isLoading = false;
        this.showDefaultRecommendation = energyCalculationResponse.isDefaultResponse;
        this.showDefaultRentalMeasures = energyCalculationResponse.default_rental_measures != null;
        this.defaultRecommendationDisclaimer = EnergyEfficiencyResultsComponent.getDefaultRecommendationDisclaimer(this.responseData);
    }

    private handleRecommendationError(err) {
        this.errorMessage = "Sorry, we couldn't find any recommendations for you";
        this.displayErrorMessage(err);
    }

    private static getEnergyCalculations(energyCalculationResponse: EnergyCalculationResponse,
                                         recommendations: EnergyEfficiencyRecommendation[]): EnergyCalculations {
        const potentialEnergyBillSavingPoundsPerYear = sumBy(
            recommendations,
            recommendation => recommendation.costSavingPoundsPerYear
        );
        return new EnergyCalculations(energyCalculationResponse, potentialEnergyBillSavingPoundsPerYear);
    }

    private static getDefaultRecommendationDisclaimer(responseData: ResponseData): string {
        const fuelType = getFuelTypeDescription(responseData.fuelType);
        const homePropertyDescription = getHomePropertyDescription(responseData.homeType, responseData.builtForm);

        return `Sorry, we had trouble generating results for your house. Please try again later. ` +
            `We have put general recommendations for a ${fuelType} heated ${homePropertyDescription} below.`;
    }
}
