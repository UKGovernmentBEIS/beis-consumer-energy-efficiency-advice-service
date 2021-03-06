import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {TenureType} from './tenure-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";

@Component({
    selector: 'app-ownership-status-question',
    templateUrl: './tenure-type-question.component.html',
    animations: [slideInOutAnimation]
})
export class TenureTypeQuestionComponent extends QuestionBaseComponent {
    tenureTypeOptions: MultipleChoiceOption[];

    get responseForAnalytics(): string {
        return TenureType[this.response];
    }

    constructor(responseData: ResponseData) {
        super(responseData);
        this.tenureTypeOptions = [
            {
                value: TenureType.OwnerOccupancy,
                className: 'owner-occupancy',
                name: 'I own my own home'
            },
            {
                value: TenureType.PrivateTenancy,
                className: 'private-tenancy',
                name: 'I rent my home from a private landlord'
            },
            {
                value: TenureType.SocialTenancy,
                className: 'social-tenancy',
                name: 'I rent my home from the council or a housing association'
            },
        ];
    }

    get response(): TenureType {
        return this.responseData.tenureType;
    }

    set response(val: TenureType) {
        this.responseData.tenureType = val;
    }
}
