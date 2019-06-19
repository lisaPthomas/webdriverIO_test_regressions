import LoginPage from '../../pageobjects/login.page.js';
import CalendarPage from '../../pageobjects/care_manager/community_calendar.page.js';
let moment = require('moment');

describe('community_calendar/add_delete_one_event', () => {
    before('Should Login', ()=> {
        LoginPage.login();
    });

    beforeEach('Should navigate to community calendar', () => {
        browser.url('/Facility/calendar/view');
        waitForTitle('Independa :: Community Calendars');
        browser.waitUntil(() => (CalendarPage.loadingScreen.waitForDisplayed(15000, true)), 15000, 'Loading page is still visible');        
    });

    let eventId = makeId(6);

    it('Add event for Today', () => {
        let eventTitle = eventId + ' Auto Test Event';
        let description = 'This is an auto test description. Created at ' + moment();
        
        CalendarPage.createSimpleEvent(eventTitle, description);
        CalendarPage.expectEventCreated(eventId);
    });

    it('Delete Event for Today', () => {
        CalendarPage.todayDiv.waitForDisplayed();
        let newEventElem = $('a*='+ eventId); 
        newEventElem.waitForDisplayed();
        newEventElem.click();
        CalendarPage.deleteBtn.waitForDisplayed();
        CalendarPage.deleteBtn.click();
        CalendarPage.confirmDelete.click();
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 15000 });
        waitForTitle('Independa :: Community Calendars');
        CalendarPage.calendarTable.waitForExist();
        let isNewEventExisting = newEventElem.isExisting();
        expect(isNewEventExisting).to.be.false;
    });
});
