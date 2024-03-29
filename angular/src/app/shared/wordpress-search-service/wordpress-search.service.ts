import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {WordpressApiService} from '../wordpress-api-service/wordpress-api-service';
import {WordpressSearchable} from './wordpress-searchable';
import {WordpressSearchResponse} from './wordpress-search-response';
import {HttpClient} from '@angular/common/http';
import {WordpressPostFactory} from './wordpress-post-factory';

@Injectable()
export class WordpressSearchService {
    private static readonly searchEndpoint = 'wp/v2/search';

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    search(searchText: string): Observable<WordpressSearchable[]> {
        if (!searchText) {
            return Observable.of([]);
        }
        // We need to encode spaces as '+' due to the REST API search plugin not allowing spaces in the route
        const searchTerm = searchText.replace(/[^0-9a-z ]/gi, '').replace(/ /g, '+');
        const endpoint = this.wordpressApiService.getFullApiEndpoint(`${WordpressSearchService.searchEndpoint}/${searchTerm}`);
        return this.http.get<WordpressSearchResponse[]>(endpoint)
            .map(responses => responses.map(response => WordpressPostFactory
                .create(response))
                .filter(r => !r.tags.some(t => t === "tag_hide_from_search")));
    }
}
