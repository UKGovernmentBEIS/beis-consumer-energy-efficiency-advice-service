import {QuestionMetadata} from '../../base-question/question-metadata';
import {QuestionType} from '../question-type';
import {ResponseData} from '../../../shared/response-data/response-data';
import {HousingBenefitQuestionComponent} from "./housing-benefit-question.component";

export class HousingBenefitQuestionMetadata extends QuestionMetadata {
    constructor() {
        super(
            HousingBenefitQuestionComponent,
            'housing_benefit',
            QuestionType.Behaviour
        );
    }

    // If you change question order, the other isApplicable functions in benefits-questions should be revised
    isApplicable(responseData: ResponseData): boolean {
        return responseData.shouldIncludeGrantsQuestionnaire
            && !responseData.receiveIncomeRelatedBenefits
            && !responseData.receivePensionGuaranteeCredit
            && !responseData.receiveSocietalBenefits
            && !responseData.receiveContributionBasedBenefits;
    }

    hasBeenAnswered(responseData: ResponseData): boolean {
        return responseData.receiveHousingBenefit !== undefined;
    }
}