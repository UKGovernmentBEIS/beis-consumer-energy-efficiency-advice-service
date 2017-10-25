import {QuestionnairePage} from "./questionnaire.po";
import {CommonPageHelpers} from "../common-page-helpers";

describe('Questionnaire', () => {
    let page: QuestionnairePage;

    beforeEach(() => {
        page = new QuestionnairePage();
        page.navigateTo();
    });

    it('should display with no errors', () => {
        expect(page.hasError()).toBeFalsy();
        expect(page.getHeading()).toContain('postcode');
    });

    it('should include core questions', () => {
        // Sleep 1s between each question to allow for animation
        // Postcode and mini-EPC
        page.enterPostcode('nw19pq');
        page.selectFirstAddress();
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('Here\'s what we know so far...');
        CommonPageHelpers.clickButton('Yes');

        // Home type
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('type of home');
        page.clickOption('ground floor flat');

        // Flat position
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('its position');
        page.clickOption('1 Side Exposed');

        // Home age
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How old');
        page.selectFirstHomeAge();
        page.goForwards();

        // Storey count
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How many storeys');
        page.goForwards();

        // Bedrooms count
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('How many bedrooms ');
        page.goForwards();

        // Fuel type
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('type of fuel');
        page.clickOption('electricity');

        // Tariff
        CommonPageHelpers.sleep(1000);
        expect(page.getHeading()).toContain('electricity tariff');
    })
});