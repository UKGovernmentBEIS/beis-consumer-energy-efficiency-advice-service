import {Component, OnInit} from "@angular/core";
import {EnergyCalculationApiService} from "../shared/energy-calculation-api-service/energy-calculation-api-service";
import {ResponseData} from "../shared/response-data/response-data";
import {RdSapInput} from "../shared/energy-calculation-api-service/request/rdsap-input";
import {EnergySavingRecommendation} from "./recommendation-card/energy-saving-recommendation";
import {EnergyCalculationResponse} from "../shared/energy-calculation-api-service/response/energy-calculation-response";
import {EnergyCalculations} from "./potentials/energy-calculations";
import {LocalAuthorityService} from "./local-authority-service/local-authority.service";
import {GrantResponse, LocalAuthorityResponse} from "./local-authority-service/local-authority-response";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import keys from "lodash-es/keys";
import orderBy from "lodash-es/orderBy";
import sumBy from "lodash-es/sumBy";
import {RecommendationService} from './recommendation-service/recommendation.service';
import {RecommendationMetadataResponse} from './recommendation-service/recommendation-metadata-response';
import {PageStateService} from '../shared/page-state-service/page-state.service';

@Component({
    selector: 'app-results-page',
    templateUrl: './results-page.component.html',
    styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {
    recommendations: EnergySavingRecommendation[];
    energyCalculations: EnergyCalculations;
    localAuthorityName: string;
    availableGrants: GrantResponse[];
    recommendationMetadataResponses: RecommendationMetadataResponse[];

    private energyCalculationResponse: EnergyCalculationResponse;

    constructor(private responseData: ResponseData,
                private energyCalculationApiService: EnergyCalculationApiService,
                private localAuthorityService: LocalAuthorityService,
                private recommendationService: RecommendationService,
                private pageStateService: PageStateService
    ) {
    }

    ngOnInit() {
        this.pageStateService.showLoading();
        Observable.forkJoin(
            this.energyCalculationApiService.fetchEnergyCalculation(new RdSapInput(this.responseData)),
            this.localAuthorityService.fetchLocalAuthorityDetails(this.responseData.localAuthorityCode),
            this.recommendationService.fetchRecommendationDetails()
        )
            .subscribe(
                ([energyCalculation, localAuthority, recommendations]) => {
                    this.handleEnergyCalculationResponse(energyCalculation);
                    this.handleLocalAuthorityResponse(localAuthority);
                    this.handleRecommendationResponses(recommendations);
                },
                (error) => this.pageStateService.showGenericErrorAndLogMessage(error),
                () => this.onLoadingComplete());
    }

    private handleEnergyCalculationResponse(response: EnergyCalculationResponse) {
        this.energyCalculationResponse = response;
    }

    private handleLocalAuthorityResponse(response: LocalAuthorityResponse) {
        this.localAuthorityName = response.display_name;
        this.availableGrants = response.grants;
    }

    private handleRecommendationResponses(responses: RecommendationMetadataResponse[]) {
        this.recommendationMetadataResponses = responses;
    }

    private onLoadingComplete() {
        const allRecommendations = keys(this.energyCalculationResponse.measures)
            .map(measureCode => {
                const recommendationMetadata: RecommendationMetadataResponse = this.recommendationMetadataResponses
                    .find((recommendationTypeDetail) => recommendationTypeDetail.acf.rdsap_measure_code === measureCode);
                if (!recommendationMetadata) {
                    this.pageStateService.showGenericErrorAndLogMessage(`Recommendation with code ${ measureCode } not recognised`);
                    return null;
                }
                return new EnergySavingRecommendation(
                    this.energyCalculationResponse.measures[measureCode],
                    recommendationMetadata,
                    RecommendationService.recommendationIcons[measureCode]
                )
            });
        this.recommendations = orderBy(allRecommendations, ['costSavingPoundsPerYear'], ['desc']);
        const potentialEnergyBillSavingPoundsPerYear = sumBy(
            this.recommendations,
            recommendation => recommendation.costSavingPoundsPerYear
        );
        this.energyCalculations = new EnergyCalculations(this.energyCalculationResponse, potentialEnergyBillSavingPoundsPerYear);
        this.pageStateService.showLoadingComplete();
    }
}
