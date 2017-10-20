import {Type} from '@angular/core';
import {QuestionBaseComponent} from './question-base-component';
import {QuestionType} from '../question-type';
import {ResponseData} from "../../response-data/response-data";

export abstract class QuestionMetadata<S> {
    constructor(
        public componentType: Type<QuestionBaseComponent<S>>,
        public heading: string,
        public questionType: QuestionType,
    ) {
    }

    isApplicable(responseData: ResponseData): boolean {
        return true;
    }

    abstract hasBeenAnswered(responseData: ResponseData): boolean;
}