import {QuestionMetadata} from "../../../../base-question/question-metadata";
import {OccupantsQuestionComponent} from "./occupants-question.component";
import {QuestionType} from "../../../../question-type";
import {ResponseData} from "../../../../../shared/response-data/response-data";

export class OccupantsQuestionMetadata extends QuestionMetadata<number> {
    constructor() {
        super(
            OccupantsQuestionComponent,
            'occupants',
            QuestionType.User
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.numberOfOccupants !== undefined;
    }
}