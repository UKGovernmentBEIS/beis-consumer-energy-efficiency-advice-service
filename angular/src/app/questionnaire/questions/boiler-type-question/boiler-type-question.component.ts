import {Component} from '@angular/core';
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";

@Component({
    selector: 'app-boiler-type-question',
    templateUrl: './boiler-type-question.component.html',
    styleUrls: ['./boiler-type-question.component.scss'],
    animations: [slideInOutAnimation],
})
export class BoilerTypeQuestionComponent extends QuestionBaseComponent<boolean> {
}
