import LoginPage from '../../pageobjects/login.page.js';
import CalendarPage from '../../pageobjects/care_manager/community_calendar.page.js';
import UploaderPage from '../../pageobjects/fileUploader.page';
let moment = require('moment');

describe('community_calendar/add_event_pdf', () => {
    before('Should Login', ()=> {
        LoginPage.login();
    });

    beforeEach('Should navigate to community calendar', () => {
        browser.url('/Facility/calendar/view');
        waitForTitle('Independa :: Community Calendars');
        browser.waitUntil(() => (CalendarPage.loadingScreen.waitForDisplayed(15000, true)), 15000, 'Loading page is still visible');        
    });

    it('Add event for today with pdf', () => {
        let eventId = makeId(6);
        let pdfFile = currentDirectory + '/assets/text.pdf';
        CalendarPage.todayDiv.waitForDisplayed();
        CalendarPage.todayDiv.click();
        
        // Add Event
        CalendarPage.eventName.waitForDisplayed();
        CalendarPage.eventName.setValue(eventId + 'Test w/ PDF');
        CalendarPage.descripition.setValue('Should have a pdf attachment Created at ' + moment());
        //Add PDF        
        UploaderPage.uploadPDF(pdfFile);
        CalendarPage.nextBtn.click();
        CalendarPage.saveBtn.waitForDisplayed();
        CalendarPage.saveBtn.click();
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });
        CalendarPage.expectEventCreated(eventId);
    });

});