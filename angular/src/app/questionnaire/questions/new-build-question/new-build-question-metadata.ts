import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {NewBuildQuestionComponent} from "./new-build-question.component";
import {HomeAge} from "../home-age-question/home-age";

export class NewBuildQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            NewBuildQuestionComponent,
            'new_build',
            QuestionType.House
        );
    }

    isApplicable(responseData: ResponseData): boolean {
        return responseData.homeAge === HomeAge.from2011toPresent;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.newBuild !== undefined;
    }
}
