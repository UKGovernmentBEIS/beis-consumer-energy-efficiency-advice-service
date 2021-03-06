import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';

import { LatestNewsSectionComponent } from './latest-news-section.component';
import {WordpressPagesService} from '../wordpress-pages-service/wordpress-pages.service';
import {LatestNewsCardComponent} from '../latest-news-card/latest-news-card.component';
import {GoogleAnalyticsService} from "../analytics/google-analytics.service";
import {SpinnerAndErrorContainerComponent} from "../spinner-and-error-container/spinner-and-error-container.component";

describe('LatestNewsSectionComponent', () => {
    let component: LatestNewsSectionComponent;
    let fixture: ComponentFixture<LatestNewsSectionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LatestNewsSectionComponent, LatestNewsCardComponent, SpinnerAndErrorContainerComponent ],
            imports: [
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {provide: WordpressPagesService, useValue: {getLatestPages: () => Observable.of([])}},
                GoogleAnalyticsService,
                SpinnerAndErrorContainerComponent
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LatestNewsSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
