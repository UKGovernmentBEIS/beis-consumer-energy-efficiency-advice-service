import {browser, by, element, protractor} from "protractor";
import {CommonPageHelpers} from "../common-page-helpers";
import {QuestionnairePage} from "../questionnaire-page";

export class HomeBasicsQuestionnairePage extends QuestionnairePage {
    private miniEpcEnabled: boolean;

    navigateTo() {
        return browser.get('/energy-efficiency/questionnaire/home-basics');
    }

    enterPostcode(postcode: string) {
        element(by.css('app-postcode-epc-question input.text-input')).sendKeys(postcode, protractor.Key.ENTER);
        browser.waitForAngular();
    }

    selectFirstHomeAge() {
        const e = element(by.css('app-home-age-question .home-age-option:first-child'));
        CommonPageHelpers.clickWhenClickable(e);
    }

    selectAddressIfApplicable() {
        this.addressListIsPresent().then(isPresent => {
            this.miniEpcEnabled = isPresent;
            if (isPresent) {
                this.selectFirstAddress();
            }
        });
    }

    selectMyAddressIsNotListed() {
        const e = element(by.css('app-postcode-epc-question .list-select .list-select-option.address-not-listed'));
        CommonPageHelpers.clickWhenClickable(e);
    }

    confirmEpcIfApplicable() {
        // This must be checked in the control flow, as this.miniEpcEnabled is set asynchronously in #selectAddressIfApplicable.
        return browser.controlFlow().execute(() => {
            if (this.miniEpcEnabled) {
                expect(this.getHeading()).toContain('EPC summary');
                CommonPageHelpers.clickButton('additional details');
                CommonPageHelpers.sleep(1000);
            }
        });
    }

    confirmEpcNotAvailable() {
        return browser.controlFlow().execute(() => {
            expect(this.getHeading()).toContain('EPC summary');
            CommonPageHelpers.clickButton('additional details');
            CommonPageHelpers.sleep(1000);
        });
    }

    addressListIsPresent() {
        return element(by.css('app-postcode-epc-question .list-select')).isPresent();
    }

    private selectFirstAddress() {
        const e = element(by.css('app-postcode-epc-question .list-select .list-select-option:first-child'));
        CommonPageHelpers.clickWhenClickable(e);
    }
}
