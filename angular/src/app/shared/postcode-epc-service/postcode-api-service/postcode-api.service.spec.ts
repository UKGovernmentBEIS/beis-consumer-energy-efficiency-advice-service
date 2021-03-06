import {async, getTestBed, TestBed} from '@angular/core/testing';
import 'rxjs/add/operator/toPromise';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpRequest} from '@angular/common/http';
import {PostcodeApiService} from './postcode-api.service';
import {PostcodeBasicDetailsResponse} from '../model/response/postcode-basic-details-response';

describe('PostcodeApiService', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: PostcodeApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostcodeApiService],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        service = injector.get(PostcodeApiService);
    });

    describe('#construct', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('#fetchBasicPostcodeDetails', () => {

        const postcode = 'SW1H 0ET';
        const postcodeWithoutSpaces = 'SW1H0ET';

        it('returns data from the API endpoint', async(() => {
            // given
            const expectedResponse: PostcodeBasicDetailsResponse = {
                status: 200,
                result: {
                    country: "England",
                    postcode: postcode,
                    latitude: 51.498772,
                    longitude: -0.130974,
                    codes: {
                        admin_district: 'E09000033'
                    }
                }
            };

            // when
            const actualResponse = service.fetchBasicPostcodeDetails(postcode).toPromise();
            httpMock.expectOne(matchesExpectedRequest).flush(expectedResponse);

            // then
            actualResponse.then((response) => {
                expect(response).toEqual(expectedResponse);
            });
            httpMock.verify();
        }));

        function matchesExpectedRequest(request: HttpRequest<any>): boolean {
            const matchesExpectedMethod = request.method === 'GET';
            const matchesExpectedUrl =
                (request.urlWithParams === `https://postcodes.io/postcodes/${ postcodeWithoutSpaces }`);
            return matchesExpectedMethod && matchesExpectedUrl;
        }
    });
});
