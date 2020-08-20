import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {EnergySavingMeasureResponse} from "../energy-calculation-api-service/response/energy-saving-measure-response";
import {ResponseData} from "../response-data/response-data";
import {GreenHomesGrantService} from "../../green-homes-grant/green-homes-grant-service/green-homes-grant.service";
import {GreenHomesGrantEligibility} from "../../green-homes-grant/green-homes-grant-service/green-homes-grant-eligibility";
import {
    shouldRecommendAirSourceHeatPump,
    shouldRecommendGroundSourceHeatPump
} from "../heating-systems/heating-systems";
import {HomeType} from "../../questionnaire/questions/home-type-question/home-type";
import {RoofType} from "../../questionnaire/questions/construction-question/construction-types";
import {EnergySavingMeasureContentService} from "../energy-saving-measure-content-service/energy-saving-measure-content.service";
import {MeasureContent} from "../energy-saving-measure-content-service/measure-content";

export interface GreenHomesGrantRecommendation {
    code: string;
    response: EnergySavingMeasureResponse;
}

const MEASURE_RECOMMENDATION_PREDICATES: { [code: string]: (responseData: ResponseData) => boolean } = {
    // Air source heat pump.
    'Z1': shouldRecommendAirSourceHeatPump,
    // Ground source heat pump.
    'Z4': shouldRecommendGroundSourceHeatPump,
    // Park home insulation.
    'park_home_insulation': data => data.homeType === HomeType.ParkHomeOrMobileHome,
    // Flat roof insulation.
    'A2': data => data.homeType !== HomeType.ParkHomeOrMobileHome && data.roofType === RoofType.FlatNoInsulation,
    // Room-in-roof insulation.
    'A3': data => data.homeType !== HomeType.ParkHomeOrMobileHome && data.roofType === RoofType.PitchedNoInsulation
};

@Injectable()
export class GreenHomesGrantRecommendationsService {

    constructor(private responseData: ResponseData,
                private greenHomesGrantService: GreenHomesGrantService,
                private measureService: EnergySavingMeasureContentService) {
    }

    getGreenHomesGrantRecommendations(): Observable<GreenHomesGrantRecommendation[]> {
        return Observable.forkJoin(
            this.greenHomesGrantService.getEligibility(),
            this.measureService.fetchMeasureDetails()
        ).mergeMap(([eligibility, measuresContent]) => {
            if (eligibility === GreenHomesGrantEligibility.Ineligible) {
                return Observable.of([]);
            }
            const recommendations = [];
            for (const [code, shouldRecommendMeasure] of Object.entries(MEASURE_RECOMMENDATION_PREDICATES)) {
                if (!shouldRecommendMeasure(this.responseData)) {
                    continue;
                }
                const recommendation = GreenHomesGrantRecommendationsService.buildRecommendation(code, measuresContent);
                if (recommendation !== null) {
                    recommendations.push(recommendation);
                }
            }
            return Observable.of(recommendations);
        });
    }

    private static buildRecommendation(code: string, measureContents: MeasureContent[]): GreenHomesGrantRecommendation {
        const measure = measureContents.find(m => m.acf.measure_code === code);
        if (measure === undefined || measure.acf === undefined) {
            return null;
        }
        const response = GreenHomesGrantRecommendationsService.getResponse(
            parseInt(measure.acf.installation_cost_lower_bound),
            parseInt(measure.acf.installation_cost_upper_bound),
            parseInt(measure.acf.lifetime)
        );
        return { code, response };
    }

    private static getResponse(minInstallationCost: number, maxInstallationCost: number, lifetime: number): EnergySavingMeasureResponse {
        return {
            number: '',
            min_installation_cost: minInstallationCost || 0,
            max_installation_cost: maxInstallationCost || 0,
            lifetime: lifetime || 0,
            energy_saving: 0,
            cost_saving: 0,
            uncertainty: 0,
            FIT: 0,
            RHI: 0
        };
    }
}