import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-occupants-question',
    templateUrl: './occupants-question.component.html',
    styleUrls: ['./occupants-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class OccupantsQuestionComponent extends QuestionBaseComponent implements OnInit {
    get responseForAnalytics(): string {
        return JSON.stringify({
            adultsAgedUnder64: this.adultsAgedUnder64,
            adultsAged64To80: this.adultsAged64To80,
            adultsAgedOver80: this.adultsAgedOver80,
            childrenAgedUnder5: this.childrenAgedUnder5,
            childrenAged5AndAbove: this.childrenAged5AndAbove
        });
    }

    ngOnInit() {
        this.adultsAgedUnder64 = this.responseData.numberOfAdultsAgedUnder64 || 0;
        this.adultsAged64To80 = this.responseData.numberOfAdultsAged64To80 || 0;
        this.adultsAgedOver80 = this.responseData.numberOfAdultsAgedOver80 || 0;
        this.childrenAged5AndAbove = this.responseData.numberOfChildrenAged5AndAbove || 0;
        this.childrenAgedUnder5 = this.responseData.numberOfChildrenAgedUnder5 || 0;
    }

    get adultsAgedUnder64(): number {
        return this.responseData.numberOfAdultsAgedUnder64;
    }

    set adultsAgedUnder64(val: number) {
        this.responseData.numberOfAdultsAgedUnder64 = val;
    }

    get adultsAged64To80(): number {
        return this.responseData.numberOfAdultsAged64To80;
    }

    set adultsAged64To80(val: number) {
        this.responseData.numberOfAdultsAged64To80 = val;
    }

    get adultsAgedOver80(): number {
        return this.responseData.numberOfAdultsAgedOver80;
    }

    set adultsAgedOver80(val: number) {
        this.responseData.numberOfAdultsAgedOver80 = val;
    }

    get childrenAged5AndAbove(): number {
        return this.responseData.numberOfChildrenAged5AndAbove;
    }

    set childrenAged5AndAbove(val: number) {
        this.responseData.numberOfChildrenAged5AndAbove = val;
    }

    get childrenAgedUnder5(): number {
        return this.responseData.numberOfChildrenAgedUnder5;
    }

    set childrenAgedUnder5(val: number) {
        this.responseData.numberOfChildrenAgedUnder5 = val;
    }

    handleFormSubmit() {
        this.complete.emit();
    }
}
