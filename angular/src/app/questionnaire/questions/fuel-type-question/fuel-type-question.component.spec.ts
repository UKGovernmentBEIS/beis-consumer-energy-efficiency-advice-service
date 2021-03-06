import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {FuelTypeQuestionComponent} from './fuel-type-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {FuelType} from './fuel-type';
import {MultipleChoiceQuestionComponent} from "../../common-questions/multiple-choice-question/multiple-choice-question.component";

describe('FuelTypeQuestionComponent', () => {
    let fixture: ComponentFixture<FuelTypeQuestionComponent>;
    let component: FuelTypeQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FuelTypeQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FuelTypeQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a fuel type', () => {
        // given
        const solidFuel = fixture.debugElement.query(By.css('.solid-fuel'));

        // when
        solidFuel.nativeElement.click();

        // then
        expect(component.response).toBe(FuelType.SolidFuel);
    });
});
