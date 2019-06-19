import ManageTVPage from '../../pageobjects/care_manager/manage_tv.page.js';
import LoginPage from '../../pageobjects/login.page.js';
import StatusMessagePage from '../../pageobjects/status_message.page.js';

describe('manage_tvs', () => {
    before('Should Login', () => {
        LoginPage.login();
        browser.url('/DeviceAuthorization/tv/manage_tvs');
        waitForTitle('Independa :: Manage TVs and AnyTV Companions')
    });

    it('Validates required name field', () => {
        //Should get error message for trying to save without a name
        ManageTVPage.addTVbtn.waitForDisplayed();
        ManageTVPage.addTVbtn.click();
        waitForTitle('Independa :: Add TV');
        ManageTVPage.saveBtn.click();
        StatusMessagePage.messageTextEquals('Please check the form for errors');
        let errorDiv = ManageTVPage.requiredDiv.getText();
        expect(errorDiv).to.equal('This field is required.');

        //Cancel button should send user back to manage tv page
        ManageTVPage.cancelBtn.click();
        waitForTitle('Independa :: Manage TVs and AnyTV Companions');
    });

});
