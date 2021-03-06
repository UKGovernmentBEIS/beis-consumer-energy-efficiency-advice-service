import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResponseData} from '../../shared/response-data/response-data';
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

@Component({
    selector: 'app-boiler-landing-page',
    templateUrl: './boiler-landing-page.component.html',
    styleUrls: ['./boiler-landing-page.component.scss']
})
export class BoilerLandingPageComponent implements OnInit {

    troubleshootingMobileExpanded = false;
    replacingMobileExpanded = false;
    grantsMobileExpanded = false;
    installerMobileExpanded = false;

    constructor(private responseData: ResponseData,
        private router: Router,
        private pageTitle: PageTitleService) {
    }

    ngOnInit(): void {
        this.pageTitle.set('Boilers & Heating Systems');
    }

    onPostcodeSelected() {
        this.router.navigate(['/installer-search/']);
    }

    onEpcSelected(lmkKey: string) {
        if (lmkKey) {
            this.router.navigate(['/boiler/epc-replace', lmkKey]);
        } else {
            this.router.navigate(['/boiler/epc-replace/unknown']);
        }
    }

    scrollTo(event: MouseEvent) {
        event.srcElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
}
