import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';

import {WarmerHomeComponent} from './warmer-home.component';
import {ArticleCardComponent} from '../article-card/article-card.component';
import {LatestNewsCardComponent} from '../../shared/latest-news-card/latest-news-card.component';
import {LargeVideoCardComponent} from '../../shared/large-video-card/large-video-card.component';
import {LandingPageComponent} from '../landing-page.component';
import {NavigationBarComponent} from '../../layout-components/navigation-bar/navigation-bar.component';
import {ResponseData} from '../../shared/response-data/response-data';
import {PostcodeLookupComponent} from '../../shared/postcode-lookup/postcode-lookup.component';
import {QuestionContentService} from '../../shared/question-content/question-content.service';
import {PostcodeEpcService} from '../../shared/postcode-epc-service/postcode-epc.service';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';
import {PostcodeApiService} from '../../shared/postcode-epc-service/postcode-api-service/postcode-api.service';
import {DataCardComponent} from '../../shared/data-card/data-card.component';
import {LatestNewsSectionComponent} from '../../shared/latest-news-section/latest-news-section.component';
import {SearchBarComponent} from '../../layout-components/search-bar/search-bar.component';
import {InlineSVGModule} from 'ng-inline-svg';
import {NavBarSuboptionComponent} from '../../layout-components/navigation-bar/nav-bar-suboption/nav-bar-suboption.component';
import {GoogleAnalyticsService} from '../../shared/analytics/google-analytics.service';
import {MeasureCardComponent} from '../measure-card/measure-card.component';
import {EnergySavingMeasureContentService} from '../../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';
import {SpinnerAndErrorContainerComponent} from '../../shared/spinner-and-error-container/spinner-and-error-container.component';
import {EpcLookupComponent} from '../../shared/epc-lookup/epc-lookup.component';
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

describe('WarmerHomeComponent', () => {
    let component: WarmerHomeComponent;
    let fixture: ComponentFixture<WarmerHomeComponent>;

    const postcodeEpcServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    const postcodeApiServiceStub = {
        fetchPostcodeDetails: (postcode) => Observable.of(null)
    };

    const pageTitleStub = {
        set: () => {}
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                WarmerHomeComponent,
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsSectionComponent,
                LatestNewsCardComponent,
                PostcodeLookupComponent,
                EpcLookupComponent,
                DataCardComponent,
                NavBarSuboptionComponent,
                SearchBarComponent,
                MeasureCardComponent,
                SearchBarComponent,
                SpinnerAndErrorContainerComponent,
            ],
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule,
                InlineSVGModule
            ],
            providers: [
                ResponseData,
                {provide: QuestionContentService, useValue: {fetchQuestionsContent: () => Observable.throw('error')}},
                {provide: PostcodeEpcService, useValue: postcodeEpcServiceStub},
                {provide: WordpressPagesService, useValue: {getLatestPages: () => Observable.of([])}},
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                {provide: EnergySavingMeasureContentService, useValue: {
                    'fetchMeasureDetailsForLandingPage': (() => Observable.of([]))
                }},
                {provide: PageTitleService, useValue: pageTitleStub},
                GoogleAnalyticsService,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WarmerHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
