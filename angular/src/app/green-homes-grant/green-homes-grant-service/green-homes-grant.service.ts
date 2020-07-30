import {Injectable} from '@angular/core';
import {ResponseData} from '../../shared/response-data/response-data';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import isEqual from 'lodash-es/isEqual';
import clone from 'lodash-es/clone';
import {GreenHomesGrantEligibility} from "./green-homes-grant-eligibility";
import {Country} from "../../questionnaire/questions/postcode-epc-question/country";

@Injectable()
export class GreenHomesGrantService {

    private cachedResponseData: ResponseData;
    private _eligibility: Observable<GreenHomesGrantEligibility>;

    constructor(private responseData: ResponseData) {
    }

    public getEligibility(): Observable<GreenHomesGrantEligibility> {
        if (!isEqual(this.responseData, this.cachedResponseData) || !this._eligibility) {
            this.cachedResponseData = clone(this.responseData);
            this._eligibility = this.calculateEligibility();
        }
        return this._eligibility;
    }

    private calculateEligibility(): Observable<GreenHomesGrantEligibility> {
        if (this.cachedResponseData.country !== Country.England) {
            return Observable.of(GreenHomesGrantEligibility.Ineligible);
        }
        // TODO SEA-36: Add means tested eligibility requirement
        return Observable.of(GreenHomesGrantEligibility.Eligible);
    }
}