import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ArticleCardComponent} from './article-card.component';
import {Article} from './article';
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';

describe('ArticleCardComponent', () => {
    let component: ArticleCardComponent;
    let fixture: ComponentFixture<ArticleCardComponent>;

    const article: Article = {
        title: 'Article title',
        summary: 'Article summary',
        iconClassName: '',
        readMore: ''
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ArticleCardComponent, SpinnerAndErrorContainerComponent ],
            imports: [FormsModule, RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleCardComponent);
        component = fixture.componentInstance;
        component.article = article;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the right title', () => {
        const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
        expect(titleElement.innerText).toEqual(article.title);
    });

    it('should display the right summary', () => {
        const summaryElement = fixture.debugElement.query(By.css('.summary')).nativeElement;
        expect(summaryElement.innerText).toEqual(article.summary);
    });
});
