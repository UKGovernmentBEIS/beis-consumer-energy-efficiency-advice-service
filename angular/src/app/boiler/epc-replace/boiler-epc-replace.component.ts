import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {EpcRecommendation} from '../../shared/epc-api-service/model/response/epc-recommendation';
import {BoilerType} from '../boiler-types-service/boiler-type';
import {BoilerTypesService} from '../boiler-types-service/boiler-types.service';
import sortBy from 'lodash-es/sortBy';
import {EpcApiService} from '../../shared/postcode-epc-service/epc-api-service/epc-api.service';
import {BoilerPageMeasuresService} from '../measures-section/boiler-page-measures.service';
import {EnergySavingRecommendation} from '../../shared/recommendation-card/energy-saving-recommendation';
import {PageTitleService} from "../../shared/page-title-service/page-title.service";

@Component({
    selector: 'app-boiler-epc-replace',
    templateUrl: './boiler-epc-replace.component.html',
    styleUrls: ['./boiler-epc-replace.component.scss']
})
export class BoilerEpcReplaceComponent implements OnInit {
    lmkKey: string;
    loading = true;
    recommendations: EpcRecommendation[];
    boilerTypes: BoilerType[];
    measures: EnergySavingRecommendation[];

    constructor(private epcApiService: EpcApiService,
                private boilerPageMeasuresService: BoilerPageMeasuresService,
                private boilerTypesService: BoilerTypesService,
                private route: ActivatedRoute,
                private pageTitle: PageTitleService) {
        this.lmkKey = this.route.snapshot.paramMap.get('lmkKey');
    }

    ngOnInit() {
        this.pageTitle.set('Replacing your boiler');
        Observable.forkJoin(
            this.epcApiService.getRecommendationsForLmkKey(this.lmkKey),
            this.boilerPageMeasuresService.fetchMeasuresForBoilerPages(),
            this.boilerTypesService.fetchBoilerTypes(),
        )
            .subscribe(
                ([epcRecommendations, measures, boilerTypes]) => {
                    this.recommendations = epcRecommendations;
                    this.measures = measures;
                    this.boilerTypes = sortBy(boilerTypes, type => +(type.averageInstallationCost));
                },
                () => this.handleError(),
                () => this.loading = false,
            );
    }

    boilerNeedsReplacing() {
        return this.recommendations && this.recommendations.some(rec => rec.isBoilerReplacement());
    }

    private handleError() {
        this.recommendations = undefined;
        this.loading = false;
    }
}
