import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ElectricityTariffQuestionComponent} from './electricity-tariff-question.component';
import {ResponseData} from "../../response-data/response-data";
import {ElectricityTariffQuestion} from "./electricity-tariff-question";
import {ElectricityTariff} from "./electricity-tariff";

describe('ElectricityTariffQuestionComponent', () => {
    let fixture: ComponentFixture<ElectricityTariffQuestionComponent>;
    let component: ElectricityTariffQuestionComponent;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ElectricityTariffQuestionComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ElectricityTariffQuestionComponent);
        component = fixture.componentInstance;
        responseData = new ResponseData();
        component.question = new ElectricityTariffQuestion(responseData);
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a tariff type', () => {
        // given

        // when
        let standard = fixture.debugElement.query(By.css('#standard-button'));
        standard.nativeElement.click();

        // then
        expect(responseData.electricityTariff).toBe(ElectricityTariff.Standard);
    });

    it('should notify of completion when clicking on a tariff type', () => {
        // given

        // when
        let offPeak = fixture.debugElement.query(By.css('#off-peak-button'));
        offPeak.nativeElement.click();

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });
});
