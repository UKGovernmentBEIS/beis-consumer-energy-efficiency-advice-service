import {LocalGrantResponse} from "../../shared/local-authority-service/local-authority-response";
import {GrantEligibility} from "../grant-eligibility-service/grant-eligibility";
import {GrantViewModel} from "./grant-view-model";
import {RecommendationStep} from "../../shared/recommendations-service/recommendation-step";

export class LocalAuthorityGrantViewModel implements GrantViewModel {

    public name: string;
    public description: string;
    public grantId: string;
    public eligibility: GrantEligibility = GrantEligibility.MayBeEligible;
    public shouldDisplayWithoutMeasures = false;
    public annualPaymentPoundsStandalone: number = null;
    public annualPaymentPoundsByMeasure: {[measureCode: string]: number} = {};
    public linkedMeasureCodesForOneOffPayment: string[] = [];
    public advantages: string[] = null;
    public steps: RecommendationStep[] = null;

    constructor(localGrantResponse: LocalGrantResponse) {
        this.name = localGrantResponse.display_name;
        this.description = localGrantResponse.description;
        this.grantId = localGrantResponse.slug;
    }
}