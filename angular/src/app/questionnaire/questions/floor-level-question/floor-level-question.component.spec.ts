import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {FloorLevelQuestionComponent} from './floor-level-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {FloorLevel} from './floor-level';
import {MultipleChoiceQuestionComponent} from "../../common-questions/multiple-choice-question/multiple-choice-question.component";

describe('FloorLevelQuestionComponent', () => {
    let fixture: ComponentFixture<FloorLevelQuestionComponent>;
    let component: FloorLevelQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FloorLevelQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FloorLevelQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a floor level', () => {
        // given

        // when
        const basement = fixture.debugElement.query(By.css('.basement'));
        basement.nativeElement.click();

        // then
        expect(component.response).toBe(FloorLevel.Basement);
    });
});
