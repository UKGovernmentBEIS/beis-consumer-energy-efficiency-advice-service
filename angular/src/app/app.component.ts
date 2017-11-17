import {Component} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/distinctUntilChanged';
import {GoogleAnalyticsService} from "./shared/analytics/google-analytics.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private router: Router, private googleAnalyticsService: GoogleAnalyticsService) {
        // Configure Google Analytics tracking if that's supported in this environment
        if (GoogleAnalyticsService.GOOGLE_ANALYTICS_SUPPORTED) {
            router.events.distinctUntilChanged((previous: any, current: any) => {
                if (current instanceof NavigationEnd) {
                    return previous.url === current.url;
                }
                return true;
            }).subscribe(() => {
                this.googleAnalyticsService.recordPageView();
            });
        }
    }
}
