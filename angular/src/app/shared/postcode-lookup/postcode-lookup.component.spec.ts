import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {PostcodeLookupComponent} from './postcode-lookup.component';
import {ResponseData} from '../response-data/response-data';
import {PostcodeEpcService} from '../postcode-epc-service/postcode-epc.service';
import {PostcodeApiService} from '../postcode-epc-service/postcode-api-service/postcode-api.service';
import {PostcodeBasicDetailsResponse} from '../postcode-epc-service/model/response/postcode-basic-details-response';
import {SpinnerAndErrorContainerComponent} from '../spinner-and-error-container/spinner-and-error-container.component';
import {PostcodeDetails} from "../postcode-epc-service/model/postcode-details";
import {Country} from "../../questionnaire/questions/postcode-epc-question/country";

describe('PostcodeLookupComponent', () => {
    let component: PostcodeLookupComponent;
    let fixture: ComponentFixture<PostcodeLookupComponent>;
    let responseData: ResponseData;

    const VALID_POSTCODE = 'SW1H0ET';
    const VALID_LOCAL_AUTHORITY_CODE = "E09000033";
    const INVALID_POSTCODE = 'invalid';
    const mockPostcodeValidator = (postcode: string) => postcode === VALID_POSTCODE;

    const dummyBasicPostcodeDetails: PostcodeBasicDetailsResponse = require('assets/test/dummy-postcode-response.json');

    const postcodeApiServiceStub = {
        fetchBasicPostcodeDetails: (postcode) => {
            if (postcode === INVALID_POSTCODE) {
                return Observable.throw(PostcodeApiService.POSTCODE_NOT_FOUND_STATUS);
            }

            return Observable.of(dummyBasicPostcodeDetails);
        }
    };

    beforeEach(async(() => {
        spyOn(PostcodeEpcService, 'isValidPostcode').and.callFake(mockPostcodeValidator);

        TestBed.configureTestingModule({
            declarations: [PostcodeLookupComponent, SpinnerAndErrorContainerComponent],
            providers: [
                {provide: PostcodeApiService, useValue: postcodeApiServiceStub},
                ResponseData
            ],
            imports: [FormsModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PostcodeLookupComponent);
        component = fixture.componentInstance;
        responseData = TestBed.get(ResponseData);
        fixture.detectChanges();
        spyOn(TestBed.get(PostcodeApiService), 'fetchBasicPostcodeDetails').and.callThrough();
        spyOn(component.postcodeSelected, 'emit');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the postcode API service when a postcode is entered', () => {
        // when
        component.postcodeInput = VALID_POSTCODE;
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        expect(TestBed.get(PostcodeApiService).fetchBasicPostcodeDetails).toHaveBeenCalledWith(component.postcodeInput);
    });

    it('should display an error message upon entering an invalid postcode', () => {
        // given
        component.postcodeInput = INVALID_POSTCODE;

        // when
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        const errorMessage = fixture.debugElement.query(By.css('.error'));
        expect(errorMessage).not.toBeNull();
    });

    it('should emit an event with the correct postcode information upon entering a valid postcode', () => {
        // given
        component.postcodeInput = VALID_POSTCODE;

        // when
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        expect(component.postcodeSelected.emit)
            .toHaveBeenCalledWith(new PostcodeDetails(VALID_POSTCODE, null, VALID_LOCAL_AUTHORITY_CODE, Country.England));
    });
});
