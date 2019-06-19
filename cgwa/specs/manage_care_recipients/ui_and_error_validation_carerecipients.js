import LoginPage from '../../pageobjects/login.page.js';
import CrFormPage from '../../pageobjects/care_recipient/cr_form.page.js';

describe("manage_care_recipients/ui_and_error_validation_carerecipients", () => {
    before('Login', () => {
        LoginPage.login();
    });

    //TODO: When Visual Regression SS are added - add test for testing UI (steps are bold, buttons are clickable)

    it('Checks first and last name validation when Adding Care Recipient', () => {
        browser.url('/myaccount/carereceiver/add');
        waitForTitle('Independa :: Add Care Recipient');
        CrFormPage.nextBtn.waitForExist(); 
        browser.pause(200);
        CrFormPage.nextBtn.click();
        CrFormPage.firstNameInvalid.waitForDisplayed();
        var firstNameInvalidText = CrFormPage.firstNameInvalid.getText();
        expect(firstNameInvalidText).to.equal('This field is required.');
        CrFormPage.firstName.setValue('Test');
        CrFormPage.nextBtn.click();
        CrFormPage.lastNameInvalid.waitForExist();
        var lastNameInvalidText = CrFormPage.lastNameInvalid.getText();
        expect(lastNameInvalidText).to.equal('This field is required.');
    });

})