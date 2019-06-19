import BroadcastPage from '../../pageobjects/care_manager/broadcast.page.js';
import LoginPage from '../../pageobjects/login.page.js';
let moment = require('moment');

describe('broadcasts/crud_broadcast', () => {
    before('Login', () => {
        LoginPage.login();     
    });

    beforeEach('Navigate to broadcast page', () => {
        browser.url('/event/broadcast/geteventslist/');
        waitForTitle('Independa :: Broadcasts');
    });

    it('Add Broadcast Message - Never Repeat', () => {
        let currentTime = moment();
        let broadcastTime = currentTime.add(5, 'm').format('LT'); //outputs in format 8:30PM 
        let messageId = makeId(5);
        BroadcastPage.createBroadcast('Auto Create, Never Repeat', broadcastTime, messageId);
        browser.setTimeout({ 'pageLoad': 10000 });
        $('tbody').waitForDisplayed();
        let tableRowWithMessage = $('table*=' + messageId).$('tr:nth-of-type(1) td:nth-of-type(2)').getText();
        let tableRowWithTime = $('table*=' + messageId).$('tr:nth-of-type(2) td:nth-of-type(2)').getText();
        expect(tableRowWithMessage).to.contain(messageId);
        expect(tableRowWithTime).to.contain(broadcastTime.toLowerCase());
        //TODO: add expect for start and end time
    });

    
    it('Delete Broadcast', () => {
        let currentTime = moment();
        let broadcastTime = currentTime.add(35, 'm').format('LT');
        let messageId = makeId(5);
        BroadcastPage.createBroadcast('Auto Delete Broadcast - Never Repeat', broadcastTime, messageId);
        browser.setTimeout({ 'pageLoad': 10000 });
        BroadcastPage.manageCheckins.waitForDisplayed();
        $('table*=' + messageId).$('.icons-table_edit').click();
        BroadcastPage.messageInput.waitForDisplayed();
        BroadcastPage.deleteBtn.click();
        BroadcastPage.confirmDeleteForm.waitForDisplayed();
        BroadcastPage.confirmDeleteBtn.click();
        browser.setTimeout({ 'pageLoad': 10000 });
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });
        BroadcastPage.manageCheckins.waitForDisplayed();
        var isTableExisting = $('table*=' + messageId).isExisting();
        expect(isTableExisting).to.be.false;
    });

    let updatedBroadcastTime = currentTime.add(10, 'm').format('LT');

    it('Edit New Broadcast' + updatedBroadcastTime, () => {
        let currentTime = moment();
        let broadcastTime = currentTime.add(35, 'm').format('LT');
        let messageId = makeId(5);
        let updatedMessageId = makeId(6);
        BroadcastPage.createBroadcast('Auto Edit Broadcast - Never Repeat', broadcastTime, messageId);
        browser.setTimeout({ 'pageLoad': 10000 });
        $('tbody').waitForDisplayed();
        $('table*=' + messageId).$('.icons-table_edit').click();
        BroadcastPage.messageInput.waitForDisplayed();
        let updatedBroadcastMessage = updatedMessageId + ' Auto Edit Broadcast Updated - Never Repeat ' +
                            'Created at ' + moment().format("MM-DD-YY HH:mm") + 
                            ' for start time: ' + updatedBroadcastTime;
        BroadcastPage.messageInput.setValue(updatedBroadcastMessage);
        BroadcastPage.timeInput.setValue(updatedBroadcastTime);
        BroadcastPage.saveBtn.click();
        browser.setTimeout({ 'pageLoad': 10000 });
        $('tbody').waitForDisplayed();
        browser.pause(500);
        let tableRowWithMessage = $('table*=' + updatedMessageId).$('tr:nth-of-type(1) td:nth-of-type(2)').getText();
        let tableRowWithTime = $('table*=' + updatedMessageId).$('tr:nth-of-type(2) td:nth-of-type(2)').getText();

        expect(tableRowWithMessage).to.contain(updatedMessageId);
        expect(tableRowWithTime).to.contain(updatedBroadcastTime.toLowerCase());
    });
})
