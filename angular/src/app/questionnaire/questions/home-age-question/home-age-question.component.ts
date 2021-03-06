import {QuestionBaseComponent, slideInOutAnimation} from '../../base-question/question-base-component';
import {HomeAge} from './home-age';
import {Component, OnInit} from '@angular/core';

interface DropdownOption<T> {
    name: string;
    value: HomeAge;
}

@Component({
    selector: 'app-home-age-question',
    templateUrl: './home-age-question.component.html',
    styleUrls: ['./home-age-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class HomeAgeQuestionComponent extends QuestionBaseComponent implements OnInit {

    readonly homeAges: DropdownOption<HomeAge>[] = [
        {name: 'Before 1900', value: HomeAge.pre1900},
        {name: '1900 to 1929', value: HomeAge.from1900to1929},
        {name: '1930 to 1949', value: HomeAge.from1930to1949},
        {name: '1950 to 1966', value: HomeAge.from1950to1966},
        {name: '1967 to 1975', value: HomeAge.from1967to1975},
        {name: '1976 to 1982', value: HomeAge.from1976to1982},
        {name: '1983 to 1990', value: HomeAge.from1983to1990},
        {name: '1991 to 1995', value: HomeAge.from1991to1995},
        {name: '1996 to 2002', value: HomeAge.from1996to2002},
        {name: '2003 to 2006', value: HomeAge.from2003to2006},
        {name: '2007 or later', value: HomeAge.from2007toPresent}
    ];


    get responseForAnalytics(): string {
        return JSON.stringify({
            homeAge: HomeAge[this.homeAge],
        });
    }

    ngOnInit() {
        this.homeAge = this.responseData.homeAge || HomeAge.pre1900;
    }

    get homeAge(): HomeAge {
        return this.responseData.homeAge;
    }

    set homeAge(val: HomeAge) {
        this.responseData.homeAge = val;
        if (val !== HomeAge.from2007toPresent) {
            this.responseData.newBuild = false;
        }
    }
}
