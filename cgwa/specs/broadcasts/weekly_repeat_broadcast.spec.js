import BroadcastPage from '../../pageobjects/care_manager/broadcast.page.js';
import LoginPage from '../../pageobjects/login.page.js';
let moment = require('moment');

describe('broadcast/weekly_repeat_broadcast', () => {
    before('Login', () => {
        LoginPage.login();     
    });

    beforeEach('Navigate to broadcast page', () => {
        browser.url('/event/broadcast/geteventslist/');
        waitForTitle('Independa :: Broadcasts');
    });

    it('Create broadcast with Weekly recurrence for Today, Sun, Tues, Thurs', () => {
        let broadcastTime = "9:30 AM";
        let messageId = makeId(5);
        BroadcastPage.addBroadcastBtn.waitForDisplayed();
        BroadcastPage.addBroadcastBtn.click();
        BroadcastPage.repeatSelect.waitForDisplayed();
        BroadcastPage.repeatSelect.selectByVisibleText('Weekly');
        let daysToCheck = [
            BroadcastPage.todayCheckbox,
            BroadcastPage.sundayCheckbox,
            BroadcastPage.tuesdayCheckbox,
            BroadcastPage.thursdayCheckbox
        ]
        daysToCheck.forEach((element)=> {
            if(!element.isSelected()) {
                element.click();
            }
        });

        BroadcastPage.timeInput.setValue(broadcastTime);
        BroadcastPage.messageInput.setValue(messageId + ' Repeats on Today, Sun, Tues, Thurs at: ' + broadcastTime);
        BroadcastPage.saveBtn.click();
        browser.setTimeout({ 'pageLoad': 10000 });
        $('tbody').waitForDisplayed();
        browser.pause(500);
        let tableRowWithMessage = $('table*=' + messageId).$('tr:nth-of-type(1) td:nth-of-type(2)');
        let tableRowWithMessageText = tableRowWithMessage.getText();
        let tableDays = $('table*=' + messageId).$$('tr:nth-of-type(2) .checkin-checked');
        let tableDaysText = [];
        
        tableDays.forEach((element) => {
            tableDaysText.push(element.getText());
        })
        let tableRowWithTime = $('table*=' + messageId).$('tr:nth-of-type(2) td:nth-of-type(2)').getText();

        expect(tableRowWithMessageText).to.contain(messageId);
        expect(tableRowWithTime).to.contain(broadcastTime.toLowerCase());
        expect(tableDaysText).to.contain('sun', 'tue', 'thu');
    }, 2);
});