import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DataCardComponent} from '../../../shared/data-card/data-card.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {RecommendationWithStepsCardComponent} from './recommendation-with-steps-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {InlineSVGModule} from 'ng-inline-svg';
import {RecommendationStepCardComponent} from "../recommendation-step-card/recommendation-step-card.component";
import {GoogleAnalyticsService} from "../../../shared/analytics/google-analytics.service";
import {InstallerSearchService} from "../../../shared/installer-search-service/installer-search.service";
import { Observable } from '../../../../../node_modules/rxjs/Observable';
import {GreenHomesGrantService} from "../../../green-homes-grant/green-homes-grant-service/green-homes-grant.service";
import {GreenHomesGrantEligibility} from "../../../green-homes-grant/green-homes-grant-service/green-homes-grant-eligibility";

describe('RecommendationWithStepsCardComponent', () => {
    let component: RecommendationWithStepsCardComponent;
    let fixture: ComponentFixture<RecommendationWithStepsCardComponent>;

    let responseData: ResponseData;

    beforeEach(async(() => {
        responseData = new ResponseData();

        const installerSearchServiceStub = {
            fetchInstallerDetails: () => Observable.of({}),
        };

        const greenHomesGrantStub = {
            getEligibility: () => Observable.of(GreenHomesGrantEligibility.Eligible),
        };

        TestBed.configureTestingModule({
            declarations: [
                RecommendationWithStepsCardComponent,
                DataCardComponent,
                RecommendationStepCardComponent,
                DataCardComponent,
                // YourPlanSummaryComponent
            ],
            providers: [
                {provide: ResponseData, useValue: responseData},
                {provide: InstallerSearchService, useValue: installerSearchServiceStub},
                {provide: GreenHomesGrantService, useValue: greenHomesGrantStub},
                GoogleAnalyticsService,
            ],
            imports: [
                RouterTestingModule,
                InlineSVGModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendationWithStepsCardComponent);
        component = fixture.componentInstance;
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });
    });
});
