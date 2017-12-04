import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

import {LandingPageComponent} from "./landing-page.component";
import {HomeImprovementsComponent} from "./home-improvements/home-improvements.component";
import {SharedModule} from "../shared/shared.module";
import {ArticleCardComponent} from "./article-card/article-card.component";
import {WarmerHomeComponent} from "./warmer-home/warmer-home.component";
import {ReduceBillsComponent} from "./reduce-bills/reduce-bills.component";
import {GreenerHomeComponent} from "./greener-home/greener-home.component";
import {StaticMeasureCardComponent} from './static-measure-card/static-measure-card.component';

@NgModule({
    declarations: [
        LandingPageComponent,
        ArticleCardComponent,
        HomeImprovementsComponent,
        WarmerHomeComponent,
        ReduceBillsComponent,
        GreenerHomeComponent,
        StaticMeasureCardComponent,
    ],
    exports: [
        HomeImprovementsComponent,
        WarmerHomeComponent,
        ReduceBillsComponent,
        GreenerHomeComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ]
})
export class LandingPageModule {
}