import {Component} from "@angular/core";
import {getHomeTypeDescription, HomeType} from "./home-type";
import {QuestionBaseComponent, slideInOutAnimation} from "../../base-question/question-base-component";
import {ResponseData} from "../../../shared/response-data/response-data";

class HomeTypeOption {
    public readonly name: string;

    constructor(public readonly value: HomeType, public readonly className: string) {
        this.name = getHomeTypeDescription(value);
    }
}

@Component({
    selector: 'app-home-type-question',
    templateUrl: './home-type-question.component.html',
    styleUrls: ['./home-type-question.component.scss'],
    animations: [slideInOutAnimation]
})
export class HomeTypeQuestionComponent extends QuestionBaseComponent {
    homeTypeOptions: HomeTypeOption[];

    get responseForAnalytics(): string {
        return HomeType[this.response];
    }

    constructor(responseData: ResponseData) {
        super(responseData);
        this.homeTypeOptions = [
            new HomeTypeOption(HomeType.DetachedHouse, 'detached-house'),
            new HomeTypeOption(HomeType.SemiDetachedOrTerracedHouse, 'semi-detached-or-terraced-house'),
            new HomeTypeOption(HomeType.DetachedBungalow, 'detached-bungalow'),
            new HomeTypeOption(HomeType.SemiDetachedBungalow, 'semi-detached-bungalow'),
            new HomeTypeOption(HomeType.FlatDuplexOrMaisonette, 'flat-duplex-or-maisonette'),
            new HomeTypeOption(HomeType.ParkHomeOrMobileHome, 'park-home-or-mobile-home')
        ];
    }

    get response(): HomeType {
        return this.responseData.homeType;
    }

    set response(val: HomeType) {
        this.responseData.homeType = val;
    }
}
