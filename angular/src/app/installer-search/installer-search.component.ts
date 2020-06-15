import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ResponseData} from "../shared/response-data/response-data";
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";
import {InstallerSearchService} from "./installer-search-service/installer-search.service";
import sortBy from 'lodash-es/sortBy';
import {PageTitleService} from "../shared/page-title-service/page-title.service";
import {Installer, InstallerPaginator} from "./installer-search-service/installer-response";

@Component({
    selector: 'app-installer-search',
    templateUrl: './installer-search.component.html',
    styleUrls: ['./installer-search.component.scss']
})
export class InstallerSearchComponent implements OnInit {

    postcode = null;
    measures = [];
    selectedMeasure = null;
    paginator: InstallerPaginator;
    installers: Installer[] = [];
    searchButtonClicked = false;
    loading = false;
    errorMessage = null;

    private lastSearchedPostcode: string = null;

    constructor(private route: ActivatedRoute,
                private responseData: ResponseData,
                private measureContentService: EnergySavingMeasureContentService,
                private installerSearchService: InstallerSearchService,
                private pageTitle: PageTitleService) {
    }

    get error() {
        return !!this.errorMessage;
    }

    ngOnInit() {
        this.pageTitle.set('Find an installer');
        this.postcode = this.responseData.postcode && this.responseData.postcode.toUpperCase();
        this.route.params.subscribe(params => {
                this.measureContentService.fetchMeasureDetails().subscribe(measures => {
                    this.measures = measures.filter(measure => measure.acf.trustmark_trade_codes);
                    this.measures = sortBy(this.measures, [m => m.acf.headline.toUpperCase()]);
                    if (params["measure-code"]) {
                        const chosenMeasure = (measures.filter(measure => params["measure-code"] === measure.acf.measure_code))[0];
                        if (chosenMeasure) {
                            this.selectedMeasure = chosenMeasure;
                        }
                    }
                });
            }
        );
    }

    fetchInstallers() {
        if (this.postcode !== this.lastSearchedPostcode) {
            this.installers = [];
        }
        if (this.selectedMeasure && this.postcode) {
            this.errorMessage = null;
            this.loading = true;
            const nextPage = this.paginator ? this.paginator.pageNumber + 1 : 1;
            // For now we will only be fetching the installers with the first trade code
            // in the array of TrustMark trade codes.
            // In the future all the trade codes in the array should be used.
            this.installerSearchService
                .fetchInstallerDetails(this.postcode, this.selectedMeasure.acf.trustmark_trade_codes[0].trade_code, nextPage)
                .subscribe(response => {
                    this.paginator = response.paginator;
                    this.installers = this.installers.concat(response.data);
                    this.loading = false;
                    this.searchButtonClicked = true;
                }, error => {
                    this.errorMessage = error;
                });
        } else {
            const messageParts = [];
            if (!this.postcode) {
                // Matches the message from the API if postcode is invalid.
                messageParts.push('No valid postcode supplied.');
            }
            if (!this.selectedMeasure) {
                messageParts.push('No measure selected.');
            }
            this.errorMessage = messageParts.join(' ');
        }
    }
}
