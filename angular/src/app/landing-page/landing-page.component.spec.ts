import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {LargeVideoCardComponent} from "./large-video-card/large-video-card.component";
import {ArticleCardComponent} from "./article-card/article-card.component";
import {LatestNewsCardComponent} from "../common/latest-news-card/latest-news-card.component";
import {LandingPageComponent} from "./landing-page.component";
import {NavigationBarComponent} from "../common/navigation-bar/navigation-bar.component";
import {ResponseData} from "../common/response-data/response-data";
import {PostcodeValidationService} from "../common/postcode-validation-service/postcode-validation.service";

describe('LandingPageComponent', () => {
    let component: LandingPageComponent;
    let fixture: ComponentFixture<LandingPageComponent>;
    let router: Router;
    let responseData: ResponseData;

    const headingText = 'heading';

    const VALID_POSTCODE = 'PO57 C03';
    const INVALID_POSTCODE = 'invalid';
    const mockPostcodeValidator = (postcode: string) => postcode === VALID_POSTCODE;
    const postcodeValidationServiceStub = {
        isValid: jasmine.createSpy('isValid').and.callFake(mockPostcodeValidator)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LandingPageComponent,
                NavigationBarComponent,
                LargeVideoCardComponent,
                ArticleCardComponent,
                LatestNewsCardComponent
            ],
            imports: [
                CommonModule,
                FormsModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                ResponseData,
                {provide: PostcodeValidationService, useValue: postcodeValidationServiceStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingPageComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        responseData = TestBed.get(ResponseData);
        spyOn(router, 'navigate');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct heading', () => {
        // given
        component.heading = headingText;

        // when
        fixture.detectChanges();

        // then
        const headingElement = fixture.debugElement.query(By.css('.page-heading .heading-text')).nativeElement;
        expect(headingElement.innerText).toEqual(headingText);
    });

    it('should use the postcode validation service to validate the postcode', () => {
        // given
        component.postcodeInput = VALID_POSTCODE;

        // when
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();

        // then
        expect(postcodeValidationServiceStub.isValid).toHaveBeenCalledWith(VALID_POSTCODE);
    });

    it('should set the postcode response upon entering a valid postcode', () => {
        // given
        component.postcodeInput = VALID_POSTCODE;

        //when
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();

        // then
        expect(responseData.postcode).toEqual(VALID_POSTCODE);
    });

    it('should navigate to the questionnaire upon entering a valid postcode', () => {
        // given
        component.postcodeInput = VALID_POSTCODE;

        //when
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();

        // then
        expect(router.navigate).toHaveBeenCalledWith(['/questionnaire/home-basics']);
    });

    it('should display an error message upon entering an invalid postcode', () => {
        // given
        component.postcodeInput = INVALID_POSTCODE;

        //when
        fixture.debugElement.query(By.css('.postcode-input-submit')).nativeElement.click();
        fixture.detectChanges();

        // then
        const errorMessage = fixture.debugElement.query(By.css('.validation-error'));
        expect(errorMessage).not.toBeNull();
    });
});