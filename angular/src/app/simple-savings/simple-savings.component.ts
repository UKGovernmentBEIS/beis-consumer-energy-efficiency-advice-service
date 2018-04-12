import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {EnergySavingMeasureContentService} from '../shared/energy-saving-measure-content-service/energy-saving-measure-content.service';
import {MeasureContent} from "../shared/energy-saving-measure-content-service/measure-content";

@Component({
    selector: 'app-simple-savings',
    templateUrl: './simple-savings.component.html',
    styleUrls: ['./simple-savings.component.scss']
})
export class SimpleSavingsComponent implements OnInit {
    isLoading: boolean;
    isError: boolean;
    measures: MeasureContent[];

    constructor(private measureService: EnergySavingMeasureContentService) {}

    ngOnInit() {

        this.measureService.fetchMeasureDetails().subscribe(measures => {
            this.measures = this.filterMeasures(measures);
        });
    }

    getMeasureIcon(measure: MeasureContent) {
        return EnergySavingMeasureContentService.measureIcons[measure.acf.measure_code];
    }

    private filterMeasures(measures: MeasureContent[]) {
        return measures.filter(measure =>
            measure.acf.tags && measure.acf.tags.some((tag) => tag === 'tag_simple_saving'));
    }
}
