import {EnergySavingMeasureResponse} from '../../common/energy-calculation-api-service/response/energy-saving-measure-response';
import {getRecommendationTypeFromCode, RecommendationType} from './recommendation-type';

export class EnergySavingRecommendation {
    recommendationType: RecommendationType;
    costSavingPoundsPerYear: number;
    energySavingKwhPerYear: number;

    constructor(
        measureCode: string,
        energySavingMeasureResponse: EnergySavingMeasureResponse
    ) {
        this.recommendationType = getRecommendationTypeFromCode(measureCode);
        this.costSavingPoundsPerYear = energySavingMeasureResponse.cost_saving;
        this.energySavingKwhPerYear = energySavingMeasureResponse.energy_saving;
    }
}