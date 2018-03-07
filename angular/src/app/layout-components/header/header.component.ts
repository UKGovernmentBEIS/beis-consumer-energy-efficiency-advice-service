import {Component, Renderer2, ViewChild, Output, ChangeDetectorRef, EventEmitter} from '@angular/core';
import {WordpressPage} from '../../shared/wordpress-pages-service/wordpress-page';
import {WordpressPagesService} from '../../shared/wordpress-pages-service/wordpress-pages.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    static readonly reducedSearchResultsQuantity = 3;

    shouldDisplaySearchDetailsDropdown: boolean = false;
    shouldDisplayExpandSearchResultsButton: boolean = false;
    shouldDisplayExpandedSearchResults: boolean = false;
    shouldExpandNav: boolean = false;
    searchText: string;
    searchState: SearchStates = SearchStates.Initial;
    searchStates = SearchStates;

    @Output() onMobileNavToggled: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('searchContainer') searchContainer;
    @ViewChild('searchInput') searchInput;
    @ViewChild('mobileSearchButton') mobileSearchButton;

    private allSearchResults: WordpressPage[] = [];
    private deregisterWindowClickListener: () => void;

    constructor(
        private renderer: Renderer2,
        private changeDetector: ChangeDetectorRef,
        private wordpressPagesService: WordpressPagesService) {
    }

    toggleMobileNav(): void {
        this.onMobileNavToggled.emit();
    }

    toggleSearchMobileBox(): void {
        if (!this.shouldDisplaySearchDetailsDropdown) {
            this.focusOnSearchBox();
        } else {
            this.collapseSearchBox();
        }
    }

    focusOnSearchBox(): void {
        this.handleSearchBoxFocussed();
        // Make sure the search box is actually visible before focusing on it
        this.changeDetector.detectChanges();
        this.searchInput.nativeElement.focus();
    }

    handleSearchBoxFocussed(): void {
        this.shouldDisplaySearchDetailsDropdown = true;
        // Ensure there is only ever one click listener
        if (this.deregisterWindowClickListener) {
            this.deregisterWindowClickListener();
        }
        this.deregisterWindowClickListener = this.renderer.listen('window', 'click', event => this.handleWindowClick(event));
    }

    handleWindowClick(event): void {
        const clickedElement = event.target;
        const isStillWithinSearchContainer = clickedElement
            && this.searchContainer.nativeElement.contains(clickedElement);
        const isMobileSearchButton = clickedElement
            && this.mobileSearchButton.nativeElement.contains(event.target);
        if (!isStillWithinSearchContainer && !isMobileSearchButton) {
            this.collapseSearchBox();
        }
    }

    collapseSearchBox(): void {
        this.deregisterWindowClickListener();
        this.searchText = null;
        this.shouldDisplaySearchDetailsDropdown = false;

        setTimeout(() => {
            this.searchState = SearchStates.Initial;
            this.resetSearchResults();
        }, 500);
    }

    searchForPages(): void {
        this.searchState = SearchStates.Loading;
        this.resetSearchResults();
        this.wordpressPagesService.searchPages(this.searchText)
            .subscribe(
                response => this.handleSearchResponse(response),
                () => this.handleSearchError()
            );
    }

    resetSearchResults(): void {
        this.allSearchResults = [];
        this.shouldDisplayExpandedSearchResults = false;
        this.shouldDisplayExpandSearchResultsButton = false;
    }

    handleSearchResponse(results: WordpressPage[]): void {
        if (results.length === 0) {
            this.searchState = SearchStates.NoResults;
            return;
        }
        this.allSearchResults = results;
        if (results.length > HeaderComponent.reducedSearchResultsQuantity) {
            this.shouldDisplayExpandSearchResultsButton = true;
        }
        this.searchState = SearchStates.Results;
    }

    handleSearchError(): void {
        this.searchState = SearchStates.Error;
    }

    displayExpandedSearchResults(): void {
        this.shouldDisplayExpandedSearchResults = true;
        this.shouldDisplayExpandSearchResultsButton = false;
        // Maintain focus inside searchContainer to prevent focusout listener causing searchContainer to collapse
        this.searchInput.nativeElement.focus();
    }

    getSearchResultsToDisplay(): WordpressPage[] {
        return this.shouldDisplayExpandedSearchResults ?
            this.allSearchResults :
            this.allSearchResults.slice(0, HeaderComponent.reducedSearchResultsQuantity);
    }
}

enum SearchStates {
    Initial,
    Loading,
    Results,
    NoResults,
    Error
}
