import LoginPage from '../../pageobjects/login.page.js';
import CalendarPage from '../../pageobjects/care_manager/community_calendar.page.js';
let moment = require('moment');

describe('community_calendar/add_delete_monthly_event', () => {
    before('Should Login', ()=> {
        LoginPage.login();
    });

    beforeEach('Should navigate to community calendar', () => {
        browser.url('/Facility/calendar/view');
        waitForTitle('Independa :: Community Calendars');
        browser.waitUntil(() => (CalendarPage.loadingScreen.waitForDisplayed(15000, true)), 15000, 'Loading page is still visible');        
    });

    let recurringEventId = makeId(6)
    let numberOfMonthsToRecur = 3;

    it('Create an event that recurs monthly on the 15th - test1', () => {
        let title = recurringEventId + ' Auto Test Event';
        let startTime = moment().format('LT'); //gives current time in format ex. 5:00 PM
        let dateInFuture = moment().add(numberOfMonthsToRecur,'Months').endOf('Month');
        let endDate = dateInFuture.format('MM/DD/YYYY'); //outputs MM+3 / 28,30,31/ YYYY
        let lastMonthOfRecurrence = dateInFuture.format('MMMM YYYY'); // ex. August 2019
        let description = 'This is an auto test description. Created at ' + moment();
        let timeOnCalendarEvent = startTime.substring(0, startTime.length -1).replace(':00', '').toLowerCase().replace(/\s/g, '');
        
        // Add Event for the 15th
        CalendarPage.openAddEventModalForDay('YYYY-MM-15');
        CalendarPage.eventName.waitForDisplayed();
        CalendarPage.eventName.setValue(title);
        CalendarPage.descripition.setValue(description);
        CalendarPage.repeatSelect.selectByVisibleText('Monthly');
        browser.execute( () => {
            document.getElementById("id_ends_on").readOnly = false;
            document.getElementById("id_date_start").readOnly = false;
          });
        CalendarPage.startTime.setValue(startTime);
        CalendarPage.endDate.setValue(endDate);
        CalendarPage.nextBtn.click();
        CalendarPage.saveBtn.waitForDisplayed();
        CalendarPage.saveBtn.click();
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });
        //checks that the monthly event is visible for 3 months
        for(let i = 0; i < numberOfMonthsToRecur; i++) {
            CalendarPage.monthHeader.waitForDisplayed();
            CalendarPage.expectEventCreated(recurringEventId, timeOnCalendarEvent); //current month
            CalendarPage.nextArrowBtn.click();
        }
        CalendarPage.expectEventCreated(recurringEventId, timeOnCalendarEvent); //+3 month
        expect(CalendarPage.monthHeader.getText()).to.equal(lastMonthOfRecurrence); 
        //check that the monthly event is NOT visible on month 4
        CalendarPage.nextArrowBtn.click();
        CalendarPage.calendarTable.waitForExist();
        let eventElem = $('a*=' + recurringEventId);
        let isElemVisible = eventElem.isExisting();
        expect(isElemVisible).to.be.false;
    });

    it('Delete All Events from test1 - Month Recurring Event', () => {
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });
        waitForTitle('Independa :: Community Calendars');
        CalendarPage.todayDiv.waitForDisplayed();
        let newEventElem = $('a*='+ recurringEventId); 
        newEventElem.waitForDisplayed();
        newEventElem.click();
        CalendarPage.deleteBtn.waitForDisplayed();
        CalendarPage.deleteBtn.click();
        CalendarPage.deleteAllEventsBtn.click();
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });
        waitForTitle('Independa :: Community Calendars');
        for(let i = 0; i <= numberOfMonthsToRecur; i++) {
            CalendarPage.monthHeader.waitForDisplayed();
            let isElemVisible = newEventElem.isExisting();
            expect(isElemVisible).to.be.false;
            browser.waitUntil(() => (CalendarPage.loadingScreen.waitForDisplayed(15000, true)), 15000, 'Loading page is still visible');                    
            CalendarPage.nextArrowBtn.waitForDisplayed();
            CalendarPage.nextArrowBtn.click();
        }
    });
});