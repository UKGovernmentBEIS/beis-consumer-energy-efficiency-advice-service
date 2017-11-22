import {EnergySavingMeasureResponse} from "../../shared/energy-calculation-api-service/response/energy-saving-measure-response";
import * as parse from "url-parse";
import {MeasureContent} from "../energy-saving-measure-content-service/measure-content";

export class EnergySavingRecommendation {

    constructor(public investmentPounds: number,
                public costSavingPoundsPerYear: number,
                public energySavingKwhPerYear: number,
                public readMoreRoute: string,
                public headline: string,
                public summary: string,
                public iconClassName: string) {
    }

    static fromResponseData(energySavingMeasureResponse: EnergySavingMeasureResponse,
                            recommendationMetadata: MeasureContent,
                            iconClassName: string): EnergySavingRecommendation {
        return new EnergySavingRecommendation(
            Math.floor(Math.random() * 99) + 1,
            energySavingMeasureResponse.cost_saving,
            energySavingMeasureResponse.energy_saving,
            parse(recommendationMetadata.acf.featured_page).pathname,
            recommendationMetadata.acf.headline,
            recommendationMetadata.acf.summary,
            iconClassName,
        );
    }
}
