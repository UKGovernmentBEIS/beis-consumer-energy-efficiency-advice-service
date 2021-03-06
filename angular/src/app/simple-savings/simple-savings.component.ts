import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {EnergySavingMeasureContentService} from '../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';
import {MeasureContent} from "../shared/energy-saving-measure-content-service/measure-content";
import * as log from 'loglevel';
import {PageTitleService} from "../shared/page-title-service/page-title.service";

@Component({
    selector: 'app-simple-savings',
    templateUrl: './simple-savings.component.html',
    styleUrls: ['./simple-savings.component.scss']
})
export class SimpleSavingsComponent implements OnInit {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";
    measures: MeasureContent[];

    constructor(private measureService: EnergySavingMeasureContentService,
                private pageTitle: PageTitleService) {
        this.isLoading = true;
        this.isError = false;
    }

    ngOnInit() {
        this.pageTitle.set('Simple savings');
        this.measureService.fetchMeasureDetails().subscribe(
            measures => {
                this.measures = this.filterMeasures(measures);
                this.isLoading = false;
            },
            () => this.displayErrorAndLogMessage(`No simple savings found`)
        );
    }

    getMeasureIcon(measure: MeasureContent) {
        return EnergySavingMeasureContentService.measureIcons[measure.acf.measure_code];
    }

    private filterMeasures(measures: MeasureContent[]) {
        return measures.filter(measure =>
            measure.acf.tags && measure.acf.tags.some((tag) => tag === 'tag_simple_saving'));
    }

    private displayErrorAndLogMessage(err: any) {
        log.error(err);
        log.warn(err);
        this.isLoading = false;
        this.isError = true;
    }
}
