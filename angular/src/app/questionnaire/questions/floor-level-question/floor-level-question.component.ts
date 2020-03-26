import {Component, OnInit} from '@angular/core';
import {FloorLevel, getFloorLevelDescription} from './floor-level';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";

class FloorLevelOption implements MultipleChoiceOption {
    public readonly name: string;

    constructor(public readonly value: FloorLevel, public readonly className: string) {
        this.name = getFloorLevelDescription(value);
    }
}

@Component({
    selector: 'app-floor-level-question',
    templateUrl: './floor-level-question.component.html',
    animations: [slideInOutAnimation]
})
export class FloorLevelQuestionComponent extends QuestionBaseComponent implements OnInit {
    floorLevelOptions: FloorLevelOption[];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.floorLevelOptions = [
            new FloorLevelOption(FloorLevel.Basement, 'basement'),
            new FloorLevelOption(FloorLevel.Ground, 'ground'),
            new FloorLevelOption(FloorLevel.MidFloor, 'mid-floor'),
            new FloorLevelOption(FloorLevel.TopFloor, 'top-floor')
        ];
    }

    ngOnInit() {
        this.responseData.floorLevels = this.responseData.floorLevels || [];
    }

    get responseForAnalytics(): string {
        return this.responseData.floorLevels.map(floorLevel => FloorLevel[floorLevel]).toString();
    }

    get response(): FloorLevel {
        return this.responseData.floorLevels && this.responseData.floorLevels[0];
    }

    set response(val: FloorLevel) {
        this.responseData.floorLevels = [val];
    }
}
