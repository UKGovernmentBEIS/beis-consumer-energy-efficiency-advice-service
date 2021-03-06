import {Component, OnInit} from '@angular/core';
import {UserJourneyType} from '../shared/response-data/user-journey-type';
import {ResponseData} from '../shared/response-data/response-data';
import {Router} from '@angular/router';
import {GoogleAnalyticsService} from "../shared/analytics/google-analytics.service";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    constructor(private responseData: ResponseData,
                private googleAnalyticsService: GoogleAnalyticsService,
                private router: Router,
                private pageTitle: PageTitleService) {
    }

    ngOnInit(): void {
        this.pageTitle.set('');
    }

    onEnergyCalculatorButtonClick() {
        this.sendEventToAnalytics('calculator_clicked');
        this.router.navigate(['/energy-efficiency/reduce-bills']);
    }

    onBoilerButtonClick() {
        this.sendEventToAnalytics('boilers_clicked');
        this.responseData.userJourneyType = UserJourneyType.Boiler;
        this.router.navigate(['/boiler']);
    }

    onGrantsButtonClick() {
        this.sendEventToAnalytics('grants_clicked');
        this.responseData.userJourneyType = UserJourneyType.Grants;
        this.router.navigate(['/grants']);
    }

    sendEventToAnalytics(eventName: string) {
        this.googleAnalyticsService.sendEvent(eventName, 'home-page');
    }
}
