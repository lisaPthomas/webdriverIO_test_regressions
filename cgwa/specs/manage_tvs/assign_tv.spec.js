import LoginPage from '../../pageobjects/login.page.js';
import DashboardPage from '../../pageobjects/care_manager/dashboard.page.js';
import ManangeTVPage from '../../pageobjects/care_manager/manage_tv.page.js';
import CrFormPage from '../../pageobjects/care_recipient/cr_form.page.js'

describe("manage_tvs/assign_tv", () => {

    before('Login', () => {
        LoginPage.login();
    });

    it('Create Care Recipient and a New TV, Assign this TV to CR', () => {
        let firstName = "Auto";
        let lastName = "Test" + makeId(5);
        let tvName = "AATest" + makeId(5);
        //Add Tv
        browser.url('/DeviceAuthorization/tv/manage_tvs');
        ManangeTVPage.addNewTV(tvName);
        //Add Care Recipient
        browser.url('/myaccount/manage-carereceivers-new');
        DashboardPage.addCareRecipientBtn.waitForDisplayed();
        DashboardPage.addCareRecipientBtn.click();        
        CrFormPage.firstName.setValue(firstName);
        CrFormPage.lastName.setValue(lastName);

        //Assign Newly Created TV
        CrFormPage.tvBoxList.click();
        let newTVOption = $('li=' + tvName);
        newTVOption.waitForDisplayed();
        newTVOption.click();
        //Save Care Recipient
        CrFormPage.footerNextBtn.click();
        CrFormPage.footerNextBtn.waitForDisplayed();
        CrFormPage.footerNextBtn.click();
        CrFormPage.saveBtn.waitForDisplayed();
        CrFormPage.saveBtn.click();
        waitForTitle('Independa :: Manage Care Recipients');
        
        let tableRow = $('tr*=' + lastName);
        let lastNameFromTable = tableRow.$('.sorting_1').getText();
        let assignedTVFromTable = tableRow.$('.health_conditions + td').getText();

        expect(lastNameFromTable).to.equal(lastName);
        expect(assignedTVFromTable).to.equal(tvName);
    });

});
