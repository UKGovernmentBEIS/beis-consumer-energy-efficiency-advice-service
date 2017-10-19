import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {HomeTypeQuestionComponent} from './home-type-question.component';
import {ResponseData} from "../../../response-data/response-data";
import {HomeType} from "./home-type";

describe('HomeTypeQuestionComponent', () => {
    let fixture: ComponentFixture<HomeTypeQuestionComponent>;
    let component: HomeTypeQuestionComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeTypeQuestionComponent ],
            providers: [ResponseData]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeTypeQuestionComponent);
        component = fixture.componentInstance;
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on a home type', () => {
        // given

        // when
        let detachedHouse = fixture.debugElement.query(By.css('.detached-house'));
        detachedHouse.nativeElement.click();

        // then
        expect(component.response).toBe(HomeType.DetachedHouse);
    });

    it('should notify of completion when clicking on a home type', () => {
        // given

        // when
        let detachedHouse = fixture.debugElement.query(By.css('.detached-house'));
        detachedHouse.nativeElement.click();

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });
});
