import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {LettingDomesticPropertyQuestionComponent} from './letting-domestic-property-question.component';
import {LettingDomesticPropertyStage} from "./letting-domestic-property-stage";

describe('LettingDomesticPropertyQuestionComponent', () => {
    let component: LettingDomesticPropertyQuestionComponent;
    let fixture: ComponentFixture<LettingDomesticPropertyQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LettingDomesticPropertyQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LettingDomesticPropertyQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on one of the buttons', () => {
        // given

        // when
        const yes = fixture.debugElement.query(By.css('.before-2018'));
        yes.nativeElement.click();

        // then
        expect(component.response).toBe(LettingDomesticPropertyStage.BeforeApril2018);
    });

    it('should notify of completion when clicking on one of the buttons', () => {
        // given

        // when
        const no = fixture.debugElement.query(By.css('.after-2018'));
        no.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});