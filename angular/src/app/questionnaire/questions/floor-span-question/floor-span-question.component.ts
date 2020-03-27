import {Component, OnInit} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {FloorLevel, getFloorLevelDescription} from '../floor-level-question/floor-level';
import pull from 'lodash-es/pull';
import includes from 'lodash-es/includes';
import {MultipleChoiceOption} from "../../common-questions/multiple-choice-question/multiple-choice-option";

class FloorLevelOption implements MultipleChoiceOption {
    public readonly name: string;

    constructor(public readonly value: FloorLevel, public readonly displayName: string) {
        this.name = getFloorLevelDescription(value);
    }
}

@Component({
    selector: 'app-floor-span-question',
    templateUrl: './floor-span-question.component.html',
    animations: [slideInOutAnimation]
})
export class FloorSpanQuestionComponent extends QuestionBaseComponent implements OnInit {
    floorLevelOptions: FloorLevelOption[];

    constructor(responseData: ResponseData) {
        super(responseData);
        this.floorLevelOptions = [
            new FloorLevelOption(FloorLevel.Basement, 'Basement'),
            new FloorLevelOption(FloorLevel.Ground, 'Ground'),
            new FloorLevelOption(FloorLevel.MidFloor, 'Mid-floor'),
            new FloorLevelOption(FloorLevel.TopFloor, 'Top-floor')
        ];
    }

    ngOnInit() {
        this.responseData.floorLevels = this.responseData.floorLevels || [];
    }

    get responseForAnalytics(): string {
        return this.responseData.floorLevels.map(floorLevel => FloorLevel[floorLevel]).toString();
    }

    toggleFloorLevelOption(option: FloorLevelOption) {
        if (includes(this.responseData.floorLevels, option.value)) {
            pull(this.responseData.floorLevels, option.value);
        } else {
            this.responseData.floorLevels.push(option.value);
        }
    }

    isFloorLevelOptionSelected(option: FloorLevelOption) {
        return includes(this.responseData.floorLevels, option.value);
    }
}
