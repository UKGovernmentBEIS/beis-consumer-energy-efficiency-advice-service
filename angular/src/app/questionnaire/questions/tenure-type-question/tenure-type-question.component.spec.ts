import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {ResponseData} from "../../../shared/response-data/response-data";
import {TenureTypeQuestionComponent} from "./tenure-type-question.component";
import {TenureType} from "./tenure-type";

describe('TenureTypeQuestionComponent', () => {
    let component: TenureTypeQuestionComponent;
    let fixture: ComponentFixture<TenureTypeQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TenureTypeQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TenureTypeQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when selecting an option', () => {
        // given

        // when
        fixture.debugElement.query(By.css('#private-tenancy-option')).nativeElement.click();

        // then
        expect(component.response).toBe(TenureType.PrivateTenancy);
    });

    it('should notify of completion when selecting an option', () => {
        // given

        // when
        fixture.debugElement.query(By.css('#owner-occupancy-option')).nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
