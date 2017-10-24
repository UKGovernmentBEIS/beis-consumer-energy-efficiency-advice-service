import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {RdSapInput} from './model/rdsap-input/rdsap-input';
import {Observable} from 'rxjs/Observable';
import {EnergyCalculationResponse} from './model/energy-calculation-response';

@Injectable()
export class EnergyCalculationApiService {
    private static readonly breEndpoint = 'angular-theme/v1/energy-calculation';

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    getEnergyCalculation(rdSapInput: RdSapInput): Observable<EnergyCalculationResponse> {
        const endpoint = this.wordpressApiService.getFullApiEndpoint(EnergyCalculationApiService.breEndpoint);
        const body = JSON.stringify(rdSapInput);
        return this.http.post(endpoint, body)
            .map(response => {
                if (response.hasOwnProperty('error')) {
                    throw response;
                }
                return response;
            });
    }
}