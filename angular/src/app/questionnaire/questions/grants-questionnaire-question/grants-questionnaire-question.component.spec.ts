import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResponseData} from '../../../shared/response-data/response-data';
import {By} from '@angular/platform-browser';
import {GrantsQuestionnaireQuestionComponent} from './grants-questionnaire-question.component';

describe('GrantsQuestionnaireQuestionComponent', () => {
    let component: GrantsQuestionnaireQuestionComponent;
    let fixture: ComponentFixture<GrantsQuestionnaireQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GrantsQuestionnaireQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(GrantsQuestionnaireQuestionComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with answer in response data', async(() => {
        // given
        responseData.shouldIncludeGrantsQuestionnaire = true;

        // when
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const yesOption = fixture.debugElement.query(By.css('#yes')).nativeElement;
            expect(yesOption.checked).toBeTruthy();
        });
    }));

    it('should set the response', () => {
        // when
        const yesOption = fixture.debugElement.query(By.css('#yes')).nativeElement;
        yesOption.click();

        // then
        expect(responseData.shouldIncludeGrantsQuestionnaire).toBeTruthy();
    });
});
