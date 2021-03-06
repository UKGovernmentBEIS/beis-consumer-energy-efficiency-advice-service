import {Component, EventEmitter, Input, Output} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {GrantEligibilityResultsPageComponent} from "./grant-eligibility-results-page.component";
import {EligibilityByGrant} from "../../grants/grant-eligibility-service/eligibility-by-grant";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {GrantEligibilityQuestionnaireComponent} from "../grant-eligibility-questionnaire/grant-eligibility-questionnaire.component";
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";
import {EcoHhcroHelpToHeat} from "../../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/eco-hhcro-help-to-heat";
import {NationalGrantCalculator} from "../../grants/national-grant-calculator/national-grant-calculator";
import {GrantEligibility} from "../../grants/grant-eligibility-service/grant-eligibility";
import {GrantEligibilityResultsStatus} from "./grant-eligibility-results-status";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";
import { InlineSVGModule } from 'ng-inline-svg';
import {RouterLinkButtonComponent} from "../../shared/router-link-button/router-link-button.component";

describe('GrantEligibilityResultsPageComponent', () => {
    let component: GrantEligibilityResultsPageComponent;
    let fixture: ComponentFixture<GrantEligibilityResultsPageComponent>;

    let eligibilityResponse: Observable<EligibilityByGrant>;
    const grantsEligibilityServiceStub = {
        getEligibilityByGrant: () => eligibilityResponse,
    };

    const questionnaireServiceStub = {
        isComplete: () => true,
    };

    const pageTitleStub = {
        set: () => {}
    };

    const dummyEligibilityResponse: EligibilityByGrant = {
        [EcoHhcroHelpToHeat.GRANT_ID]: {
            calculator: {} as NationalGrantCalculator,
            eligibility: GrantEligibility.NotCalculated,
        }
    };

    beforeEach(async(() => {
        eligibilityResponse = Observable.of(dummyEligibilityResponse);
        spyOn(grantsEligibilityServiceStub, 'getEligibilityByGrant').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                GrantEligibilityResultsPageComponent,
                GrantEligibilityQuestionnaireComponent,
                SpinnerAndErrorContainerComponent,
                MockQuestionnaireComponent,
                RouterLinkButtonComponent,
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                InlineSVGModule
            ],
            providers: [
                {provide: GrantEligibilityService, useValue: grantsEligibilityServiceStub},
                {provide: QuestionnaireService, useValue: questionnaireServiceStub},
                {provide: PageTitleService, useValue: pageTitleStub}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GrantEligibilityResultsPageComponent);
        component = fixture.componentInstance;
    });

    it('should be constructed', () => {
        expect(component).toBeTruthy();
    });

    it('should call grants eligibility service', () => {
        // when
        fixture.detectChanges();

        // then
        expect(grantsEligibilityServiceStub.getEligibilityByGrant).toHaveBeenCalled();
    });

    it('should display an error message if grants eligibility service responds with an error', () => {
        // given
        eligibilityResponse = ErrorObservable.create('some error text');

        // when
        fixture.detectChanges();

        // then
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should have eligible status when person is eligible', () => {
        // given
        dummyEligibilityResponse[EcoHhcroHelpToHeat.GRANT_ID].eligibility = GrantEligibility.LikelyEligible;

        // when
        fixture.detectChanges();

        // then
        expect(component.status).toEqual(GrantEligibilityResultsStatus.Eligible);
    });

    it('should have ineligible status when person is ineligible', () => {
        // given
        dummyEligibilityResponse[EcoHhcroHelpToHeat.GRANT_ID].eligibility = GrantEligibility.Ineligible;

        // when
        fixture.detectChanges();

        // then
        expect(component.status).toEqual(GrantEligibilityResultsStatus.Ineligible);
    });
});

@Component({
    selector: 'app-questionnaire',
    template: '<p>Mock Questionnaire Component</p>'
})
class MockQuestionnaireComponent {
    @Input() public questionnaireName: string;
    @Output() public onQuestionnaireComplete: EventEmitter<void> = new EventEmitter<void>();
}
