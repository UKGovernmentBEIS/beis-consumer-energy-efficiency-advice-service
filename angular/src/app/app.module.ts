import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {RoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";

import {AppComponent} from "./app.component";
import {QuestionnaireModule} from "./questionnaire/questionnaire.module";
import {SharedModule} from "./shared/shared.module";
import {HomePageModule} from "./home-page/home-page.module";
import {LandingPageModule} from "./landing-page/landing-page.module";
import {LayoutComponentsModule} from "./layout-components/layout-components.module";
import {PageModule} from "./page/page.module";
import {BoilerModule} from "./boiler/boiler.module";
import {GrantsModule} from "./grants/grants.module";
import {EnergyEfficiencyModule} from "./energy-efficiency/energy-efficiency.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RoutingModule,
        FormsModule,
        SharedModule.forRoot(),
        QuestionnaireModule.forRoot(),
        EnergyEfficiencyModule.forRoot(),
        HomePageModule,
        GrantsModule.forRoot(),
        PageModule.forRoot(),
        LandingPageModule,
        LayoutComponentsModule.forRoot(),
        BoilerModule.forRoot(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
