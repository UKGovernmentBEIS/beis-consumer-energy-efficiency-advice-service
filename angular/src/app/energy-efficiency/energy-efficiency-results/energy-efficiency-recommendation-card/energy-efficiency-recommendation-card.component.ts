import {Component, Input, OnInit} from "@angular/core";
import {EnergyEfficiencyRecommendation} from "./energy-efficiency-recommendation";
import {
    EnergyEfficiencyRecommendationTag, getActiveTags, getTagClassName,
    getTagDescription
} from "./energy-efficiency-recommendation-tag";

@Component({
    selector: 'app-energy-efficiency-recommendation-card',
    templateUrl: './energy-efficiency-recommendation-card.component.html',
    styleUrls: ['./energy-efficiency-recommendation-card.component.scss']
})
export class EnergyEfficiencyRecommendationCardComponent implements OnInit {

    private static readonly MONTHLY_SAVING_POUNDS_ROUNDING = 5;

    isExpandedView: boolean = false;
    roundedMonthlySaving: number;
    tags: EnergyEfficiencyRecommendationTag[];

    @Input() recommendation: EnergyEfficiencyRecommendation;

    ngOnInit() {
        this.roundedMonthlySaving = EnergyEfficiencyRecommendationCardComponent.getMonthlySaving(this.recommendation);
        this.tags = getActiveTags(this.recommendation.tags);
        console.log(this.recommendation.headline);
        console.log(this.recommendation.grants);
    }

    getTagDescription(tag: EnergyEfficiencyRecommendationTag) {
        return getTagDescription(tag);
    }

    getTagClassName(tag: EnergyEfficiencyRecommendationTag) {
        return getTagClassName(tag);
    }

    toggleExpandedView(): void {
        this.isExpandedView = !this.isExpandedView;
    }

    private static getMonthlySaving(recommendation: EnergyEfficiencyRecommendation): number {
        const costSavingPoundsPerMonth = recommendation.costSavingPoundsPerYear/12;
        const roundingValue = costSavingPoundsPerMonth > EnergyEfficiencyRecommendationCardComponent.MONTHLY_SAVING_POUNDS_ROUNDING ?
            EnergyEfficiencyRecommendationCardComponent.MONTHLY_SAVING_POUNDS_ROUNDING :
            1;
        return Math.round(costSavingPoundsPerMonth/roundingValue) * roundingValue;
    }
}