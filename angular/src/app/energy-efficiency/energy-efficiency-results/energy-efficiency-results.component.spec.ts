import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {EnergyCalculationResponse} from '../../shared/energy-calculation-api-service/response/energy-calculation-response';
import {isComplete, ResponseData} from '../../shared/response-data/response-data';
import {EnergyCalculationApiService} from '../../shared/energy-calculation-api-service/energy-calculation-api-service';
import {LocalGrantCardComponent} from '../../shared/local-grant-card/local-grant-card.component';
import {EnergyEfficiencyResultsComponent} from './energy-efficiency-results.component';
import {GrantEligibility} from '../../grants/grant-eligibility-service/grant-eligibility';
import {EnergyEfficiencyRecommendationCardComponent} from './energy-efficiency-recommendation-card/energy-efficiency-recommendation-card.component';
import {DataCardComponent} from '../../shared/data-card/data-card.component';
import {SpinnerAndErrorContainerComponent} from '../../shared/spinner-and-error-container/spinner-and-error-container.component';
import {RdSapInput} from '../../shared/energy-calculation-api-service/request/rdsap-input';
import {EnergyEfficiencyRecommendationTag} from './recommendation-tags/energy-efficiency-recommendation-tag';
import {BreakEvenComponent} from './break-even/break-even.component';
import {YourPlanSummaryComponent} from '../your-plan-summary/your-plan-summary.component';
import {EnergyEfficiencyRecommendation} from '../../shared/recommendations-service/energy-efficiency-recommendation';
import {RecommendationsService} from '../../shared/recommendations-service/recommendations.service';
import {YourPlanFooterComponent} from './your-plan-footer/your-plan-footer.component';
import {StickyRowWrapperComponent} from '../../shared/sticky-row-wrapper/sticky-row-wrapper.component';
import {UserStateService} from '../../shared/user-state-service/user-state-service';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import {HomeType} from '../../questionnaire/questions/home-type-question/home-type';
import {HomeAge} from '../../questionnaire/questions/home-age-question/home-age';
import {FloorAreaUnit} from '../../questionnaire/questions/floor-area-question/floor-area-unit';
import {FuelType} from '../../questionnaire/questions/fuel-type-question/fuel-type';
import {AbTestingService} from '../../shared/analytics/ab-testing.service';
import {BuiltFormAnswer} from "../../questionnaire/questions/built-form-question/built-form-answer";
import {EnergyEfficiencyCombinedRecommendationCardComponent} from "./energy-efficiency-combined-recommendation-card/energy-efficiency-combined-recommendation-card.component";
import {YourPlanFooterCombinedItemComponent} from "./your-plan-footer/your-plan-footer-combined-item/your-plan-footer-combined-item.component";
import {YourPlanFooterItemComponent} from "./your-plan-footer/your-plan-footer-item/your-plan-footer-item.component";
import {EnergyEfficiencyDisplayService} from "../../shared/energy-efficiency-display-service/energy-efficiency-display.service";
import {EnergyEfficiencyRecommendations} from "../../shared/recommendations-service/energy-efficiency-recommendations";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";
import {InstallationCost} from '../../shared/recommendations-service/installation-cost';

describe('EnergyEfficiencyResultsComponent', () => {
    let component: EnergyEfficiencyResultsComponent;
    let fixture: ComponentFixture<EnergyEfficiencyResultsComponent>;
    const dummyEnergyCalculations = require('assets/test/energy-calculation-response.json');
    let energyCalculationResponse: Observable<EnergyCalculationResponse>;
    const energyCalculationApiServiceStub = {
        fetchEnergyCalculation: () => energyCalculationResponse
    };

    let recommendationsResponse: Observable<EnergyEfficiencyRecommendations>;
    const recommendationsServiceStub = {
        getAllRecommendations: () => recommendationsResponse,
        isAddedToPlan: () => false,
        getRecommendationsInPlan: () => [],
        getUserRecommendationsInPlan: () => recommendations,
        getLandlordRecommendationsInPlan: () => [],
    };

    const userStateServiceStub = {
        saveState: () => {}
    };


    const pageTitleStub = {
        set: () => {}
    };

    let responseData: ResponseData;

    const recommendations: EnergyEfficiencyRecommendation[] = [
        {
            lifetimeYears: 40,
            costSavingPoundsPerYear: 99,
            minimumCostSavingPoundsPerYear: 89,
            maximumCostSavingPoundsPerYear: 109,
            energySavingKwhPerYear: 100,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Loft insulation',
            summary: 'No description available',
            whatItIs: '',
            isItRightForMe: '',
            tags: [EnergyEfficiencyRecommendationTag.LongerTerm],
            grant: null,
            advantages: [],
            steps: [],
            measureCode: '',
            isAddedToPlan: false,
            recommendationID: '',
            isMeasure: true,
            trustMarkTradeCodes: [],
            installationCost: new InstallationCost(199, 199, true)
        },
        {
            lifetimeYears: 40,
            costSavingPoundsPerYear: 200,
            minimumCostSavingPoundsPerYear: 180,
            maximumCostSavingPoundsPerYear: 220,
            energySavingKwhPerYear: 250,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Solar photovoltaic panels',
            summary: 'No description available',
            whatItIs: '',
            isItRightForMe: '',
            tags: [EnergyEfficiencyRecommendationTag.LongerTerm],
            grant: null,
            advantages: [],
            steps: [],
            measureCode: '',
            isAddedToPlan: false,
            recommendationID: '',
            isMeasure: true,
            trustMarkTradeCodes: [],
            installationCost: new InstallationCost(999, 999, true)
        },
        {
            lifetimeYears: 40,
            costSavingPoundsPerYear: 10,
            minimumCostSavingPoundsPerYear: 9,
            maximumCostSavingPoundsPerYear: 11,
            energySavingKwhPerYear: 5,
            readMoreRoute: ('dummy-route'),
            iconPath: 'icons/dummy.svg',
            headline: 'Cylinder insulation',
            summary: 'No description available',
            whatItIs: '',
            isItRightForMe: '',
            tags: [EnergyEfficiencyRecommendationTag.LongerTerm, EnergyEfficiencyRecommendationTag.Grant],
            grant: {
                grantId: 'national-grant-1',
                name: 'National Grant 1',
                description: 'some national grant',
                eligibility: GrantEligibility.LikelyEligible,
                steps: [],
                annualPaymentPoundsForMeasure: 0
            },
            advantages: [],
            steps: [],
            measureCode: '',
            isAddedToPlan: false,
            recommendationID: '',
            isMeasure: true,
            trustMarkTradeCodes: [],
            installationCost: new InstallationCost(20, 20, true)
        }
    ];

    beforeEach(async(() => {
        energyCalculationResponse = Observable.of(dummyEnergyCalculations);
        recommendationsResponse = Observable.of(new EnergyEfficiencyRecommendations(recommendations));

        responseData = new ResponseData();
        responseData.homeType = HomeType.House;
        responseData.builtForm = BuiltFormAnswer.Detached;
        responseData.homeAge = HomeAge.from1930to1949;
        responseData.fuelType = FuelType.MainsGas;
        responseData.floorArea = 100;
        responseData.floorAreaUnit = FloorAreaUnit.SquareMetre;
        expect(isComplete(responseData)).toBeTruthy();

        spyOn(energyCalculationApiServiceStub, 'fetchEnergyCalculation').and.callThrough();
        spyOn(recommendationsServiceStub, 'getAllRecommendations').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                EnergyEfficiencyResultsComponent,
                EnergyEfficiencyRecommendationCardComponent,
                EnergyEfficiencyCombinedRecommendationCardComponent,
                DataCardComponent,
                SpinnerAndErrorContainerComponent,
                LocalGrantCardComponent,
                BreakEvenComponent,
                YourPlanFooterComponent,
                YourPlanFooterItemComponent,
                YourPlanFooterCombinedItemComponent,
                YourPlanSummaryComponent,
                StickyRowWrapperComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                InlineSVGModule,
                HttpClientTestingModule
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                {provide: EnergyCalculationApiService, useValue: energyCalculationApiServiceStub},
                {provide: RecommendationsService, useValue: recommendationsServiceStub},
                {provide: UserStateService, useValue: userStateServiceStub},
                {provide: PageTitleService, useValue: pageTitleStub},
                AbTestingService,
                GoogleAnalyticsService,
                EnergyEfficiencyDisplayService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnergyEfficiencyResultsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call energy calculation service with response data', () => {
        // when
        fixture.detectChanges();

        // then
        expect(energyCalculationApiServiceStub.fetchEnergyCalculation)
            .toHaveBeenCalledWith(new RdSapInput(responseData));
    });

    it('should display an error message if energy calculation service responds with an error', () => {
        // given
        energyCalculationResponse = ErrorObservable.create('some error text');

        // when
        fixture.detectChanges();

        // then
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should call recommendations service', () => {
        // when
        fixture.detectChanges();

        // then
        expect(recommendationsServiceStub.getAllRecommendations).toHaveBeenCalled();
    });

    it('should display an error message if recommendations service responds with an error', () => {
        // given
        recommendationsResponse = ErrorObservable.create('some error text');

        // when
        fixture.detectChanges();

        // then
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should show recommendations', async(() => {
        // when
        fixture.detectChanges();

        // then
        const recommendationElements: DebugElement[] = fixture.debugElement.queryAll(
            By.directive(EnergyEfficiencyRecommendationCardComponent)
        );
        expect(recommendationElements.length).toEqual(3);
    }));

    it('should display energy calculations correctly', () => {
        // when
        fixture.detectChanges();

        // then
        // match data in assets/test/energy-calculation-response.json
        expect(component.energyCalculations.currentEpcRating).toBe('F');
        expect(component.energyCalculations.currentEnergyBillPoundsPerYear).toBe(1618);
        // match annual savings from recommendations above
        expect(component.energyCalculations.potentialEnergyBillSavingPoundsPerYear).toBe(309);
    });

    it('should show default recommendation when the energy calculation response is a default response', () => {
        // given
        setUpComponentWithDefaultResponse();

        // when
        fixture.detectChanges();

        // then
        expect(component.showDefaultRecommendation).toBe(true);
    });

    it('should render default recommendation disclaimer correctly', () => {
        // given
        setUpComponentWithDefaultResponse();
        const expectedDefaultRecommendationDisclaimer =
            'Sorry, we had trouble generating results for your house. Please try again later. ' +
            'We have put general recommendations for a mains gas heated detached house below.';

        // when
        fixture.detectChanges();

        // then
        expect(component.defaultRecommendationDisclaimer).toEqual(expectedDefaultRecommendationDisclaimer);
    });

    function setUpComponentWithDefaultResponse(): void {
        dummyEnergyCalculations['isDefaultResponse'] = true;
        energyCalculationResponse = Observable.of(dummyEnergyCalculations);
        fixture = TestBed.createComponent(EnergyEfficiencyResultsComponent);
        component = fixture.componentInstance;
    }
});
