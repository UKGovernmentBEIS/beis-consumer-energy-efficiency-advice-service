import {async, getTestBed, TestBed} from '@angular/core/testing';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {RecommendationsService} from './recommendations.service';
import {GrantEligibility} from '../../grants/grant-eligibility-service/grant-eligibility';
import {EnergyCalculationResponse} from '../energy-calculation-api-service/response/energy-calculation-response';
import {ResponseData} from '../response-data/response-data';
import {MeasureContent} from '../energy-saving-measure-content-service/measure-content';
import {EnergyCalculationApiService} from '../energy-calculation-api-service/energy-calculation-api-service';
import {EnergySavingMeasureContentService} from '../energy-saving-measure-content-service/energy-saving-measure-content.service';
import {GrantEligibilityService} from '../../grants/grant-eligibility-service/grant-eligibility.service';
import {RdSapInput} from '../energy-calculation-api-service/request/rdsap-input';
import {EnergyEfficiencyRecommendationTag} from '../../energy-efficiency/energy-efficiency-results/recommendation-tags/energy-efficiency-recommendation-tag';
import {StandaloneNationalGrant} from '../../grants/model/standalone-national-grant';
import {NationalGrantForMeasure} from '../../grants/model/national-grant-for-measure';
import {TenureType} from "../../questionnaire/questions/tenure-type-question/tenure-type";

describe('RecommendationsService', () => {
    let injector: TestBed;
    let service: RecommendationsService;

    const dummyEnergyCalculations: EnergyCalculationResponse = require('assets/test/energy-calculation-response.json');
    let energyCalculationResponse: Observable<EnergyCalculationResponse>;
    const energyCalculationApiServiceStub = {
        fetchEnergyCalculation: () => energyCalculationResponse
    };

    const standaloneNationalGrants: StandaloneNationalGrant[] = [
        {
            grantId: 'national-grant-1',
            name: 'National Grant 1',
            description: 'some national grant',
            eligibility: GrantEligibility.MayBeEligible,
            annualPaymentPoundsStandalone: 120,
            advantages: [],
            steps: []
        },
        {
            grantId: 'national-grant-2',
            name: 'National Grant 2',
            description: 'another national grant',
            eligibility: GrantEligibility.MayBeEligible,
            annualPaymentPoundsStandalone: 120,
            advantages: [],
            steps: []
        }
    ];

    const nationalGrantForMeasure: NationalGrantForMeasure = {
        grantId: 'national-grant-for-measure',
        name: 'National Grant For Measure',
        description: 'some national grant for measure',
        eligibility: GrantEligibility.MayBeEligible,
        annualPaymentPoundsForMeasure: 120,
        steps: []
    };

    let standaloneNationalGrantsResponse: Observable<StandaloneNationalGrant[]>;
    let nationalGrantsForMeasureResponse: Observable<NationalGrantForMeasure[]>;
    const grantsEligibilityServiceStub = {
        getEligibleStandaloneGrants: () => standaloneNationalGrantsResponse,
        getEligibleGrantsForMeasure: () => nationalGrantsForMeasureResponse
    };

    const dummyMeasures = require('assets/test/measures-response.json');
    let measuresResponse: Observable<MeasureContent[]>;
    const measuresServiceStub = {
        fetchMeasureDetails: () => measuresResponse
    };

    let responseData: ResponseData;

    beforeEach(async(() => {
        measuresResponse = Observable.of(dummyMeasures);
        responseData = new ResponseData();
        responseData.tenureType = TenureType.OwnerOccupancy;
        standaloneNationalGrantsResponse = Observable.of(standaloneNationalGrants);
        nationalGrantsForMeasureResponse = Observable.of([nationalGrantForMeasure]);
        energyCalculationResponse = Observable.of(dummyEnergyCalculations);

        spyOn(grantsEligibilityServiceStub, 'getEligibleStandaloneGrants').and.callThrough();
        spyOn(energyCalculationApiServiceStub, 'fetchEnergyCalculation').and.callThrough();
        spyOn(measuresServiceStub, 'fetchMeasureDetails').and.callThrough();

        TestBed.configureTestingModule({
            providers: [
                RecommendationsService,
                {provide: ResponseData, useValue: responseData},
                {provide: EnergyCalculationApiService, useValue: energyCalculationApiServiceStub},
                {provide: EnergySavingMeasureContentService, useValue: measuresServiceStub},
                {provide: GrantEligibilityService, useValue: grantsEligibilityServiceStub}
            ]
        });
    }));

    beforeEach(() => {
        injector = getTestBed();
        service = injector.get(RecommendationsService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#getAllRecommendations', () => {
        it('should call energy calculation API service with response data', () => {
            // when
            service.getAllRecommendations();

            // then
            expect(energyCalculationApiServiceStub.fetchEnergyCalculation)
                .toHaveBeenCalledWith(new RdSapInput(responseData));
        });

        it('should call measures content service', () => {
            // when
            service.getAllRecommendations();

            // then
            expect(measuresServiceStub.fetchMeasureDetails).toHaveBeenCalled();
        });

        it('should call grant eligibility service', () => {
            // when
            service.getAllRecommendations();

            // then
            expect(grantsEligibilityServiceStub.getEligibleStandaloneGrants).toHaveBeenCalled();
        });

        it('should include all home improvement measures in response with grant savings added on', async(() => {
            // given
            const expectedMeasures = Object.keys(dummyEnergyCalculations.measures)
                .map(measureCode => {
                    const costSavingFromGrant = nationalGrantForMeasure.annualPaymentPoundsForMeasure;
                    const costSavingFromMeasure = dummyEnergyCalculations.measures[measureCode].cost_saving || 0;
                    const costSaving = costSavingFromGrant + costSavingFromMeasure;
                    const energySaving = dummyEnergyCalculations.measures[measureCode].energy_saving;
                    return [costSaving, energySaving];
                });

            // when
            const recommendationsObservable = service.getAllRecommendations();

            // then
            recommendationsObservable.toPromise().then(recommendations => {
                const actualRecommendations = recommendations
                    .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);
                expectedMeasures.forEach(measure => expect(actualRecommendations).toContain(measure));
            });
        }));

        it('should include all habit measures in response', async(() => {
            // given
            const expectedMeasures = Object.values(dummyEnergyCalculations.habit_measures)
                .map(measure => [measure.cost_saving, measure.energy_saving]);

            // when
            const recommendationsObservable = service.getAllRecommendations();

            // then
            recommendationsObservable.toPromise().then(recommendations => {
                const actualRecommendations = recommendations
                    .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);
                expectedMeasures.forEach(measure => expect(actualRecommendations).toContain(measure));
            });
        }));

        it('should only include renter measures if renter', async(() => {
            // given
            responseData.tenureType = TenureType.PrivateTenancy;
            const expectedMeasures = Object.keys(dummyEnergyCalculations.measures_rented)
                .map(measureCode => {
                    const costSavingFromGrant = nationalGrantForMeasure.annualPaymentPoundsForMeasure;
                    const costSavingFromMeasure = dummyEnergyCalculations.measures[measureCode].cost_saving || 0;
                    const costSaving = costSavingFromGrant + costSavingFromMeasure;
                    const energySaving = dummyEnergyCalculations.measures[measureCode].energy_saving;
                    return [costSaving, energySaving];
                });

            // when
            const recommendationsObservable = service.getAllRecommendations();

            // then
            recommendationsObservable.toPromise().then(recommendations => {
                const actualRecommendations = recommendations
                    .map(rec => [rec.costSavingPoundsPerYear, rec.energySavingKwhPerYear]);
                expectedMeasures.forEach(measure => expect(actualRecommendations).toContain(measure));
            });
        }));

        it('should return recommendation details correctly', async(() => {
            // when
            const recommendationsObservable = service.getAllRecommendations();

            // then
            recommendationsObservable.toPromise().then((recommendations) => {
                // match data in assets/test/energy-calculation-response.json and assets/test/measures-response.json
                // for measure code U
                expect(recommendations[8].headline).toBe('Solar photovoltaic panels');
                expect(recommendations[8].readMoreRoute).toEqual('/measures/meta_solar_photovoltaic_panels');
                expect(recommendations[8].iconPath).toBe(EnergySavingMeasureContentService.measureIcons['U']);
                expect(recommendations[8].advantages).toEqual(['Green', 'Cost effective']);
                const expectedTags = EnergyEfficiencyRecommendationTag.LongerTerm |
                    EnergyEfficiencyRecommendationTag.Grant | EnergyEfficiencyRecommendationTag.FundingAvailable;
                expect(recommendations[8].tags).toEqual(expectedTags);
                expect(recommendations[8].lifetimeYears).toEqual(30);
                expect(recommendations[8].investmentPounds).toEqual(750);
            });
        }));

        it('should sort recommendations by interleaving the behavioural and grant measures within the BRE "main" measures', async(() => {
            // when
            const recommendationsObservable = service.getAllRecommendations();

            // then
            recommendationsObservable.toPromise().then((recommendations) => {
                // match data in assets/test/energy-calculation-response.json and assets/test/measures-response.json
                expect(recommendations[0].headline).toBe('Cavity wall insulation');
                expect(recommendations[1].headline).toBe('Lower thermostat by one degree');
                expect(recommendations[2].headline).toBe('National Grant 1');
                expect(recommendations[3].headline).toBe('Hot water cylinder insulation');
                expect(recommendations[4].headline).toBe('National Grant 2');
            });
        }));

        it('should tag the top 5 recommendations as top-recommendations', async(() => {
            // when
            const recommendationsObservable = service.getAllRecommendations();

            // then
            recommendationsObservable.toPromise().then((recommendations) => {
                recommendations.filter((rec, index) => index < 5)
                    .forEach(rec => expect(rec.tags & EnergyEfficiencyRecommendationTag.TopRecommendations).toBeTruthy());
                recommendations.filter((rec, index) => index >= 5)
                    .forEach(rec => expect(rec.tags & EnergyEfficiencyRecommendationTag.TopRecommendations).toBeFalsy());
            });
        }));

        it('should link recommendation to available grant', async(() => {
            // when
            const recommendationsObservable = service.getAllRecommendations();

            // then
            recommendationsObservable.toPromise().then((recommendations) => {
                const cavityWallInsulationRecommendation = recommendations.find(rec => rec.headline === 'Cavity wall insulation');
                expect(cavityWallInsulationRecommendation.grant.name).toBe('National Grant For Measure');
            });
        }));
    });
});
