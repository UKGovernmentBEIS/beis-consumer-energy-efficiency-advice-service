import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Observable} from 'rxjs/Observable';
import {By} from '@angular/platform-browser';

import { ECOSuppliersPageComponent } from './eco-suppliers-page.component';
import {WordpressECOSuppliersService} from "../shared/wordpress-eco-suppliers-service/wordpress-eco-suppliers.service";

describe('ECOSuppliersPageComponent', () => {
    let component: ECOSuppliersPageComponent;
    let fixture: ComponentFixture<ECOSuppliersPageComponent>;
    const expectedSuppliers = [{
        name: 'British Gas',
        link: 'https://britishgas.co.uk'
    }];
    const wordpressECOSuppliersServiceStub = {
        fetchAllECOSuppliers: () => Observable.of(expectedSuppliers)
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ECOSuppliersPageComponent],
            providers: [
                {provide: WordpressECOSuppliersService, useValue: wordpressECOSuppliersServiceStub}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ECOSuppliersPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the supplier content with data from the ECOSuppliersService', async(() => {
        // when
        fixture.detectChanges();

        // then
        fixture.whenStable()
            .then(() => {
                const allSupplierImages = fixture.debugElement.queryAll(By.css('.supplier img'));
                expect(allSupplierImages.length).toEqual(1);
                expect(allSupplierImages[0].nativeElement.attributes['alt'].value).toEqual(expectedSuppliers[0].name);
            });
    }));
});
