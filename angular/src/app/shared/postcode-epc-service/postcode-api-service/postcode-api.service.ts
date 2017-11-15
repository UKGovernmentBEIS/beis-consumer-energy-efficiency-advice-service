import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {WordpressApiService} from "../../wordpress-api-service/wordpress-api-service";
import {PostcodeBasicDetailsResponse} from "../model/response/postcode-basic-details-response";

@Injectable()
export class PostcodeApiService {
    private static readonly postcodeEndpoint = 'angular-theme/v1/postcode/';
    public static readonly postcodeNotFoundStatus: number = 404;

    private postcodeResponses: {[postcode: string]: Observable<PostcodeBasicDetailsResponse>} = {};

    constructor(private http: HttpClient, private wordpressApiService: WordpressApiService) {
    }

    fetchBasicPostcodeDetails(postcode: string): Observable<PostcodeBasicDetailsResponse> {
        if (!this.postcodeResponses[postcode]) {
            const postcodeWithoutSpaces = postcode.replace(/ /g, '');
            const endpoint = PostcodeApiService.postcodeEndpoint + postcodeWithoutSpaces;
            this.postcodeResponses[postcode] = this.http.get(this.wordpressApiService.getFullApiEndpoint(endpoint))
                .shareReplay(1);
        }
        return this.postcodeResponses[postcode];
    }
}
