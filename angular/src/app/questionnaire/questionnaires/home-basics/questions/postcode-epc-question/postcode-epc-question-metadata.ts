import {QuestionMetadata} from "../../../../base-question/question-metadata";
import {PostcodeEpcQuestionComponent} from "./postcode-epc-question.component";
import {PostcodeEpc} from "./model/postcode-epc";
import {QuestionType} from "../../../../question-type";
import {ResponseData} from "../../../../../common/response-data/response-data";

export class PostcodeEpcQuestionMetadata extends QuestionMetadata<PostcodeEpc> {
    constructor() {
        super(
            PostcodeEpcQuestionComponent,
            'postcode_epc',
            QuestionType.User
        );
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.postcode !== undefined;
    }
}