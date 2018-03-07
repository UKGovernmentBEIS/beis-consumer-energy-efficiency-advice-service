import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {FormsModule} from '@angular/forms';
import {ResponseData} from '../../../shared/response-data/response-data';
import {ConstructionQuestionComponent} from './construction-question.component';

describe('ShowerTypeQuestionComponent', () => {
    let component: ConstructionQuestionComponent;
    let fixture: ComponentFixture<ConstructionQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConstructionQuestionComponent],
            imports: [FormsModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConstructionQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when new roof type selected', async(() => {
        // given
        const expectedRoofType = component.roofTypes[0];

        // when
        fixture.whenStable().then(() => {
            const roofTypeSelect = fixture.debugElement.query(By.css('select.roof-type'));
            // Angular syntax for custom ngValue
            roofTypeSelect.nativeElement.value = '0: 0';
            roofTypeSelect.nativeElement.dispatchEvent(new Event('change'));

            // then
            expect(component.roofType).toBe(expectedRoofType.value);
        });
    }));

    it('should set the response when new wall type selected', async(() => {
        // given
        const expectedWallType = component.wallTypes[0];

        // when
        fixture.whenStable().then(() => {
            const wallTypeSelect = fixture.debugElement.query(By.css('select.wall-type'));
            // Angular syntax for custom ngValue
            wallTypeSelect.nativeElement.value = '0: 0';
            wallTypeSelect.nativeElement.dispatchEvent(new Event('change'));

            // then
            expect(component.wallType).toBe(expectedWallType.value);
        });
    }));

    it('should set the response when new glazing type selected', async(() => {
        // given
        const expectedGlazingType = component.glazingTypes[0];

        // when
        fixture.whenStable().then(() => {
            const glazingTypeSelect = fixture.debugElement.query(By.css('select.glazing-type'));
            // Angular syntax for custom ngValue
            glazingTypeSelect.nativeElement.value = '0: 0';
            glazingTypeSelect.nativeElement.dispatchEvent(new Event('change'));

            // then
            expect(component.glazingType).toBe(expectedGlazingType.value);
        });
    }));
});
