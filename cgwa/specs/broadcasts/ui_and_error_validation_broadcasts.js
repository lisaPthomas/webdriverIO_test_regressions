import BroadcastPage from '../../pageobjects/care_manager/broadcast.page.js';
import LoginPage from '../../pageobjects/login.page.js';
let moment = require('moment');

describe('broadcasts/ui_and_error_validation_broadcasts', () => {
    before('Login', () => {
        LoginPage.login();     
    });

    beforeEach('Navigate to broadcast page', () => {
        browser.url('/event/broadcast/geteventslist/');
        waitForTitle('Independa :: Broadcasts');
    });
    
    it('Check time and message validation errors when creating a broadcast', () => {
        //open broadcast
        BroadcastPage.addBroadcastBtn.click();
        BroadcastPage.saveBtn.waitForDisplayed();
        BroadcastPage.saveBtn.click();
        BroadcastPage.validationError.waitForDisplayed();
        let requiredText = BroadcastPage.validationError.getText();
        expect(requiredText).to.equal('Required');

        BroadcastPage.messageInput.setValue('Test');
        const timeValidator = (invalidTime) => {
            BroadcastPage.timeInput.setValue(invalidTime);
            BroadcastPage.saveBtn.click();
            BroadcastPage.status_message.waitForDisplayed();
            let statusMessageText = BroadcastPage.status_message.getText();
            expect(statusMessageText).to.equal('Please check your date and time for errors.');
        };
        timeValidator('888');
        timeValidator('asdf');
    });
});