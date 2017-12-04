import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {DataCardComponent} from "../../../shared/data-card/data-card.component";
import {YourPlanSummaryComponent} from "../../your-plan-summary/your-plan-summary.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {RecommendationStepCardComponent} from "./recommendation-step-card.component";
import {RecommendationStep} from "../../../shared/recommendations-service/recommendation-step";
import {RouterTestingModule} from "@angular/router/testing";
import {InlineSVGModule} from "ng-inline-svg";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RecommendationStepCardComponent', () => {
    let component: RecommendationStepCardComponent;
    let fixture: ComponentFixture<RecommendationStepCardComponent>;

    const step: RecommendationStep = {
        headline: 'Choose the right loft insulation',
        description: 'The type of loft insulation to install depends on your intended usage of your loft',
        moreInfoLinks: [
            {
                buttonText: 'Test static page 1',
                route: '/js/static-page-1'
            },
            {
                buttonText: 'Test static page 2',
                route: '/js/static-page-2'
            }
        ]
    };

    let responseData: ResponseData;

    beforeEach(async(() => {
        responseData = new ResponseData();

        TestBed.configureTestingModule({
            declarations: [
                RecommendationStepCardComponent,
                DataCardComponent,
                YourPlanSummaryComponent
            ],
            providers: [{provide: ResponseData, useValue: responseData}],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
                HttpClientTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendationStepCardComponent);
        component = fixture.componentInstance;
        component.step = step;
        component.stepIndex = 1;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct step number', () => {
        // when
        fixture.detectChanges();

        // then
        const stepNumberElement = fixture.debugElement.query(By.css('.step-number')).nativeElement;
        expect(stepNumberElement.innerText.toLowerCase()).toEqual('step 02');
    });

    it('should display the correct headline', () => {
        // when
        fixture.detectChanges();

        // then
        const stepNumberElement = fixture.debugElement.query(By.css('.step-headline')).nativeElement;
        expect(stepNumberElement.innerText.toLowerCase()).toEqual(step.headline.toLowerCase());
    });

    it('should initialise with the details drawer expanded for first step', () => {
        // when
        component.stepIndex = 0;
        fixture.detectChanges();

        // then
        const detailsDrawerElement = fixture.debugElement.query(By.css('.step-details-drawer'));
        expect(detailsDrawerElement.classes.expanded).toBeTruthy();
    });

    it('should initialise with the details drawer collapsed for steps other than first step', () => {
        // when
        component.stepIndex = 1;
        fixture.detectChanges();

        // then
        const detailsDrawerElement = fixture.debugElement.query(By.css('.step-details-drawer'));
        expect(detailsDrawerElement.classes.expanded).toBeFalsy();
    });

    it('should expand the details drawer when button is clicked', () => {
        // when
        fixture.detectChanges();
        toggleDetailsDrawerExpanded();

        // then
        const detailsDrawerElement = fixture.debugElement.query(By.css('.step-details-drawer'));
        expect(detailsDrawerElement.classes.expanded).toBeTruthy();
    });

    it('should display the correct description', () => {
        // when
        fixture.detectChanges();
        toggleDetailsDrawerExpanded();

        // then
        const stepNumberElement = fixture.debugElement.query(By.css('.step-description')).nativeElement;
        expect(stepNumberElement.innerText.toLowerCase()).toEqual(step.description.toLowerCase());
    });

    it('should display the correct links', () => {
        // when
        fixture.detectChanges();
        toggleDetailsDrawerExpanded();

        // then
        const actualLinkTexts = fixture.debugElement.queryAll(By.css('.more-info-description'))
            .map(el => el.nativeElement.innerText.toLowerCase());
        const expectedTexts = step.moreInfoLinks
            .map(link => link.buttonText.toLowerCase());
        expectedTexts.forEach(text => expect(actualLinkTexts).toContain(text));
    });

    function toggleDetailsDrawerExpanded() {
        const mainRowElement = fixture.debugElement.query(By.css('.step-main-row')).nativeElement;
        mainRowElement.click();
        fixture.detectChanges();
    }
});