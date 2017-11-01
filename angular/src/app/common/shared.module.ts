import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

import {TimesPipe} from "./times/times.pipe";
import {QuestionContentService} from "./question-content/question-content.service";
import {WordpressApiService} from "./wordpress-api-service/wordpress-api-service";
import {ResponseData} from "./response-data/response-data";
import {FeatureFlagService} from "./feature-flag/feature-flag.service";
import {EnergyCalculationApiService} from "./energy-calculation-api-service/energy-calculation-api-service";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {RoutingModule} from "../app-routing.module";
import {WordpressPagesService} from "./header/wordpress-pages-service/wordpress-pages.service";
import {LatestNewsCardComponent} from "./latest-news-card/latest-news-card.component";
import {PostcodeValidationService} from "./postcode-validation-service/postcode-validation.service";

@NgModule({
    declarations: [
        TimesPipe,
        HeaderComponent,
        FooterComponent,
        NavigationBarComponent,
        LatestNewsCardComponent
    ],
    exports: [
        TimesPipe,
        HeaderComponent,
        FooterComponent,
        NavigationBarComponent,
        LatestNewsCardComponent
    ],
    imports: [
        HttpClientModule,
        RoutingModule,
        CommonModule,
        FormsModule
    ],
})
export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [
                QuestionContentService,
                WordpressApiService,
                ResponseData,
                FeatureFlagService,
                EnergyCalculationApiService,
                WordpressPagesService,
                PostcodeValidationService,
            ]
        };
    }
}