import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import isEqual from "lodash-es/isEqual";
import clone from "lodash-es/clone";
import concat from "lodash-es/concat";
import orderBy from "lodash-es/orderBy";
import keys from "lodash-es/keys";
import {ResponseData} from "../response-data/response-data";
import {RecommendationOption} from "./recommendation-option";
import {EnergyCalculationApiService} from "../energy-calculation-api-service/energy-calculation-api-service";
import {EnergySavingMeasureContentService} from "../energy-saving-measure-content-service/energy-saving-measure-content.service";
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";
import {RdSapInput} from "../energy-calculation-api-service/request/rdsap-input";
import {MeasuresResponse} from "../energy-calculation-api-service/response/measures-response";
import {MeasureContent} from "../energy-saving-measure-content-service/measure-content";
import {GrantViewModel} from "../../grants/model/grant-view-model";
import {MeasureResponse} from "../energy-calculation-api-service/response/measure-response";
import {EnergyEfficiencyRecommendationTag} from "../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag";

@Injectable()
export class RecommendationsService {

    private static TOP_RECOMMENDATIONS: number = 5;

    private cachedResponseData: ResponseData;
    private cachedAllRecommendations: RecommendationOption[] = [];

    constructor(private responseData: ResponseData,
                private energyCalculationApiService: EnergyCalculationApiService,
                private measureService: EnergySavingMeasureContentService,
                private grantsEligibilityService: GrantEligibilityService) {
    }

    getAllRecommendations(): Observable<EnergyEfficiencyRecommendation[]> {
        if (!isEqual(this.responseData, this.cachedResponseData) || this.cachedAllRecommendations.length === 0) {
            this.cachedResponseData = clone(this.responseData);
            return this.refreshAllRecommendations()
                .map(recommendations => {
                    this.cachedAllRecommendations = recommendations.map(rec => {
                        return {
                            value: rec,
                            isAddedToPlan: false
                        };
                    });
                    return recommendations;
                })
        }
        return Observable.of(this.cachedAllRecommendations.map(rec => rec.value));
    }

    getRecommendationsInPlan(): EnergyEfficiencyRecommendation[] {
        return this.cachedAllRecommendations
            .filter(recommendationOption => recommendationOption.isAddedToPlan)
            .map(recommendationOption => recommendationOption.value);
    }

    toggleAddedToPlan(recommendation: EnergyEfficiencyRecommendation): void {
        const recommendationIndex = this.cachedAllRecommendations
            .findIndex(recommendationOption => isEqual(recommendationOption.value, recommendation));
        this.cachedAllRecommendations[recommendationIndex].isAddedToPlan =
            !this.cachedAllRecommendations[recommendationIndex].isAddedToPlan;
    }

    isAddedToPlan(recommendation: EnergyEfficiencyRecommendation): boolean {
        return this.cachedAllRecommendations
            .find(recommendationOption => isEqual(recommendationOption.value, recommendation))
            .isAddedToPlan;
    }

    private refreshAllRecommendations(): Observable<EnergyEfficiencyRecommendation[]> {
        return Observable.forkJoin(
            this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(this.responseData)),
            this.measureService.fetchMeasureDetails(),
            this.grantsEligibilityService.getApplicableGrants()
        )
            .map(
                ([energyCalculation, measuresContent, availableGrants]) => {
                    if (!energyCalculation) {
                        throw new Error('Received empty energy calculation response');
                    }
                    const homeImprovementRecommendations = RecommendationsService
                        .getRecommendationsContent(energyCalculation.measures, measuresContent, availableGrants);
                    const habitRecommendations = RecommendationsService
                        .getRecommendationsContent(energyCalculation.habit_measures, measuresContent, availableGrants);
                    const grantRecommendations = RecommendationsService.getGrantRecommendations(availableGrants);
                    const allRecommendations = concat(homeImprovementRecommendations, habitRecommendations, grantRecommendations);
                    const orderedRecommendations = orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc']);
                    return RecommendationsService.tagTopRecommendations(orderedRecommendations);
                }
            );
    }

    private static getRecommendationsContent(measures: MeasuresResponse<MeasureResponse>,
                                             measuresContent: MeasureContent[],
                                             availableGrants: GrantViewModel[]): EnergyEfficiencyRecommendation[] {
        return keys(measures)
            .map(measureCode => {
                const recommendationMetadata: MeasureContent = measuresContent
                    .find((recommendationTypeDetail) => recommendationTypeDetail.acf.measure_code === measureCode);
                if (!recommendationMetadata) {
                    console.error(`Recommendation with code ${ measureCode } not recognised`);
                    return null;
                }
                const linkedAvailableGrants = availableGrants
                    .filter(grant => {
                        const isLinkedForAnnualPayment = grant.annualPaymentPoundsByMeasure[measureCode];
                        const isLinkedForOneOffPayment = grant.linkedMeasureCodesForOneOffPayment.indexOf(measureCode) > -1;
                        return isLinkedForAnnualPayment || isLinkedForOneOffPayment;
                    });
                return EnergyEfficiencyRecommendation.fromMeasure(
                    measureCode,
                    measures[measureCode],
                    recommendationMetadata,
                    EnergySavingMeasureContentService.measureIcons[measureCode],
                    linkedAvailableGrants
                )
            })
            .filter(measure => measure);
    }

    private static getGrantRecommendations(grants: GrantViewModel[]): EnergyEfficiencyRecommendation[] {
        return grants
            .filter(grant => grant.shouldDisplayWithoutMeasures)
            .map(grant => EnergyEfficiencyRecommendation.fromGrant(grant, 'icon-grant'));
    }

    private static tagTopRecommendations(recommendations: EnergyEfficiencyRecommendation[]): EnergyEfficiencyRecommendation[] {
        return recommendations
            .map((recommendation: EnergyEfficiencyRecommendation, index: number) => {
                if (index < RecommendationsService.TOP_RECOMMENDATIONS) {
                    recommendation.tags |= EnergyEfficiencyRecommendationTag.TopRecommendations;
                }
                return recommendation;
            });
    }
}