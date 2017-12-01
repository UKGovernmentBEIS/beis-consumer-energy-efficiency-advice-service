import {Component, Input, OnInit} from "@angular/core";
import {RecommendationStep} from "../../../shared/recommendations-service/recommendation-step";
import padStart from "lodash-es/padStart";

@Component({
    selector: 'app-recommendation-step-card',
    templateUrl: './recommendation-step-card.component.html',
    styleUrls: ['./recommendation-step-card.component.scss']
})
export class RecommendationStepCardComponent implements OnInit {

    private static readonly INITIAL_STEP_NUMBER: number = 1;

    @Input() step: RecommendationStep;
    @Input() stepIndex: number;

    isExpanded: boolean;

    ngOnInit() {
        this.isExpanded = this.stepIndex === 0;
    }

    get formattedStepNumber(): string {
        const stepNumber = this.stepIndex + RecommendationStepCardComponent.INITIAL_STEP_NUMBER;
        return padStart(stepNumber.toString(), 2, '0');
    }

    toggleIsExpanded(): void {
        this.isExpanded = !this.isExpanded;
    }
}