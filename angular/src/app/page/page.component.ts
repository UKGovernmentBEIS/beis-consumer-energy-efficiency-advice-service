import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import {ExtendedWordpressPage} from '../shared/wordpress-pages-service/extended-wordpress-page';
import {PageTitleService} from '../shared/page-title-service/page-title.service';

/**
 * This component shows Wordpress Posts of type "page", using their "slug" as
 * a unique id.
 * In the database, "slug" is stored as "wp_posts.page_name"
 * In the WP UI, "slug" is shown as "Permalink"
 *
 * Any nesting in the WP posts is ignored, and the post is loaded by slug, and
 * displayed as /pages/:slug
 */
@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    // This component does not contain any other components, and most of the styling is applied to
    // HTML injected via the innerHtml attribute, so it's easiest to turn off encapsulation for this
    encapsulation: ViewEncapsulation.None,
})
export class PageComponent implements OnInit {

    pageData: ExtendedWordpressPage;
    pageDataContent: SafeHtml;
    headings: string[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string = "Something went wrong and we can't load this page right now. Please try again later.";

    constructor(private router: Router,
                private route: ActivatedRoute,
                private pageService: WordpressPagesService,
                private sanitizer: DomSanitizer,
                private changeDetectorRef: ChangeDetectorRef,
                private pageTitle: PageTitleService) {
    }

    ngOnInit() {
        this.route.paramMap
            .switchMap(params => {
                this.isLoading = true;
                return this.pageService.getPage(params.get('slug'));
            })
            .subscribe(
                (pageData) => this.displayPage(pageData),
                (err) => this.displayErrorAndLogMessage(err)
            );
    }

    displayPage(pageData: ExtendedWordpressPage): void {
        if (!pageData) {
            this.router.navigate(['/404'], {skipLocationChange: true});
        } else {
            this.pageData = pageData;
            this.pageDataContent = this.sanitizer.bypassSecurityTrustHtml(this.pageData.content);
            this.pageTitle.set(pageData.title);
        }
        this.isLoading = false;
        // Force angular to update the DOM, so that we can parse it and create a contents table
        this.changeDetectorRef.detectChanges();
        this.setContentsTable();
    }

    displayErrorAndLogMessage(err: any): void {
        console.error(err);
        this.isLoading = false;
        this.isError = true;
    }

    scrollIndexIntoView(index: number) {
        const pageContent = document.getElementById('wordpress-content');
        const element = pageContent.getElementsByTagName('h2')[index];
        if (element) {
            element.scrollIntoView();
        }
    }

    private setContentsTable() {
        const pageContent = document.getElementById('wordpress-content');
        if (pageContent) {
            // All the headings which we want in the contents are set to h2 in wordpress
            const headingElements = pageContent.getElementsByTagName('h2');
            const headings = [];
            for (let i = 0; i < headingElements.length; i++) {
                headings.push(headingElements[i].textContent);
            }
            this.headings = headings;
        }
    }
}
