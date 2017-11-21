import {QuestionMetadata} from "../../base-question/question-metadata";
import {QuestionType} from "../question-type";
import {ResponseData} from "../../../shared/response-data/response-data";
import {GardenQuestionComponent} from "./garden-question.component";
import {GardenAccessibility} from "./garden-accessibility";

export class GardenQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            GardenQuestionComponent,
            'garden',
            QuestionType.House,
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.shouldIncludeOptionalPropertyQuestions === undefined || responseData.shouldIncludeOptionalPropertyQuestions;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.gardenAccessibility !== undefined &&
            (responseData.gardenAccessibility !== GardenAccessibility.Accessible || responseData.gardenSizeSquareMetres !== undefined);
    }
}