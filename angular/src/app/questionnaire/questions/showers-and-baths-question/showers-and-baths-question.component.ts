import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-showers-question',
    templateUrl: './showers-and-baths-question.component.html',
    styleUrls: ['./showers-and-baths-question.scss'],
    animations: [slideInOutAnimation]
})
export class ShowersAndBathsQuestionComponent extends QuestionBaseComponent implements OnInit {

    get responseForAnalytics(): string {
        return JSON.stringify({showers: this.showers, baths: this.baths});
    }

    ngOnInit() {
        this.showers = this.showers || 0;
        this.baths = this.baths || 0;
    }

    get showers(): number {
        return this.responseData.numberOfShowersPerWeek;
    }

    set showers(val: number) {
        this.responseData.numberOfShowersPerWeek = val;
    }

    get baths(): number {
        return this.responseData.numberOfBathsPerWeek;
    }

    set baths(val: number) {
        this.responseData.numberOfBathsPerWeek = val;
    }

    handleFormSubmit() {
        if (this.isValid()) {
            this.complete.emit();
        }
    }

    private isValid() {
        return this.showers !== undefined && this.baths !== undefined;
    }
}