import LoginPage from "../../pageobjects/login.page.js";
import CalendarPage from '../../pageobjects/care_manager/community_calendar.page.js';
import StatusMessagePage from '../../pageobjects/status_message.page.js';
import SharedPage from '../../pageobjects/shared.page.js';
let moment = require('moment');

// For the community calendar tests could we add some updates to recurrences 
// and ensuring that they continue to work? By that i mean 
// change from daily (and which day) to weekly to monthly 
// with a few different patterns. Also include time changes to make sure those propagate. 
// These would be some super useful tests to add!

describe('community_calendar/update_recurring_events', () => {
    before('Login', () => {
        LoginPage.login();
        browser.url('/Facility/calendar/view');
        waitForTitle('Independa :: Community Calendars');
        browser.waitUntil(() => (CalendarPage.loadingScreen.waitForDisplayed(15000, true)), 15000, 'Loading page is still visible'); 
    });

    let recurringEventId = makeId(6);

    it('Test 1: create a daily recurring event for 28 days', () => {
        let title = recurringEventId + ' Update Recurrence';
        let startTime = '10:30 AM';
        let today = moment();
        // will always start on the first of the next month
        let startDateToClickOn = today.add(1, 'month').startOf('month').format('YYYY-MM-DD');
        // will always end on the 28th of the next month
        let endDate = today.add(27, 'days').format('MM/DD/YYYY');
        let description = 'create a daily recurrence event';
        
        //StatusMessagePage.toastMessage.waitForDisplayed(10000, true);
        //Add event to next month on the first day
        CalendarPage.nextArrowBtn.waitForDisplayed();
        CalendarPage.nextArrowBtn.click();
        SharedPage.waitForLoadingScreenNotVisible();
        CalendarPage.openAddEventModalForDay(startDateToClickOn);
        CalendarPage.eventName.waitForDisplayed();
        CalendarPage.eventName.setValue(title);
        CalendarPage.descripition.setValue(description);
        CalendarPage.repeatSelect.selectByVisibleText('Daily');
        browser.execute( () => {
            document.getElementById("id_ends_on").readOnly = false;
          });
        CalendarPage.startTime.setValue(startTime);
        CalendarPage.endDate.setValue(endDate);
        CalendarPage.nextBtn.click();
        CalendarPage.saveBtn.click();
        browser.setTimeout({ 'pageLoad': 10000 });
        StatusMessagePage.messageTextEquals('Event created successfully');
        SharedPage.waitForLoadingScreenNotVisible();
        StatusMessagePage.toastMessage.waitForDisplayed(10000, true);
        //getText for every calendar event on this month and filter out the events with this recurringEventId, expect that array to contain 28 events
        
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });
        waitForTitle('Independa :: Community Calendars');
        SharedPage.waitForLoadingScreenNotVisible();
        CalendarPage.nextArrowBtn.waitForDisplayed();
        CalendarPage.nextArrowBtn.click();
        CalendarPage.calendarTable.waitForDisplayed();
        let allCalendarEventsForMonth = $$('.fc-event-container .fc-title');
        //getText for all calendar events for this month, filter out by recurringEventId and expect count to equal 28
        let allEventTitles = allCalendarEventsForMonth.map((value) => value.getText());
        let filterEventsWithId = allEventTitles.filter((value) => value.includes(recurringEventId));
        expect(filterEventsWithId.length).to.equal(28);        
    });

    //TODO: Need to redo after QA is updated
    it('Test2: should update test1 event from daily to weekly(Mo,Th) and change start time, duration', () => {
        let startTime = '7:00 AM';
        let nextMonth = moment().add(1, 'month').startOf('month');
        let dayofweek = moment().day(0).format('dddd MM-D-YYYY'); //GETS DATE IN PAST IF DAY ALREADY PASSED
        console.log('dayofweek: ', dayofweek);
        let startDate = nextMonth.add(1, 'days').format('MM/DD/YYYY'); // outputs MM/02/YYYY
        let endDate = nextMonth.add(24, 'days').format('MM/DD/YYYY'); // outputs MM/26/YYYY
        
        console.log('endate', endDate);
        console.log('startDate:', startDate);
        let updatedDescription = 'Updated daily to weekly recurrence(Mo,Th) ';
        
        //open test 1 event
        waitForTitle('Independa :: Community Calendars');
        let testOneEvent = $('a*='+ recurringEventId); 
        testOneEvent.waitForDisplayed();
        testOneEvent.click();
        //Update test 1 event from daily to weekly on MO and TH
        CalendarPage.repeatSelect.selectByVisibleText('Weekly');
        let monday = CalendarPage.dayOfWeek('MO');
        let thursday = CalendarPage.dayOfWeek('TH');
        monday.click();
        thursday.click();
        browser.execute( () => {
            document.getElementById("id_ends_on").readOnly = false;
            document.getElementById("id_date_start").readOnly = false;
          });
        CalendarPage.startTime.setValue(startTime);
        CalendarPage.startDate.setValue(startDate);
        CalendarPage.descripition.setValue(updatedDescription);
        CalendarPage.endDate.setValue(endDate);
        CalendarPage.saveBtn.click();
        CalendarPage.saveUpdateFutureEventsBtn.waitForDisplayed();
        CalendarPage.saveUpdateFutureEventsBtn.click();
        CalendarPage.confirmSaveFutureEventsBtn.waitForDisplayed();
        CalendarPage.confirmSaveFutureEventsBtn.click();
        browser.setTimeout({ 'pageLoad': 10000 });
        StatusMessagePage.messageTextEquals('Event updated successfully');
          
        //refresh page and navigate to next month to check event updated successfully
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });
        waitForTitle('Independa :: Community Calendars');
        SharedPage.waitForLoadingScreenNotVisible();
        CalendarPage.nextArrowBtn.waitForDisplayed();
        CalendarPage.nextArrowBtn.click();
        CalendarPage.calendarTable.waitForDisplayed();
          //get every calendar event for this month and filter out the events with this recurringEventId, expect that array to contain 7 or 8 events
        let allCalendarEventsForMonth = $$('.fc-event-container .fc-title');
        let allEventTitles = allCalendarEventsForMonth.map((value) => value.getText());
        let filterEventsWithId = allEventTitles.filter((value) => value.includes(recurringEventId));
        expect(filterEventsWithId.length).to.equal(7 || 8); 
        CalendarPage.expectEventCreated(recurringEventId, '7a' )
    });
    
    it('Test3: should update test2 from weekly to monthly recurrence', () => {
        //startDate is the 2nd of the month, end date is the 26th of the month
        let startTime = '1:00 PM';
        let numberOfMonthsToRecur = 4;
        let firstOfNextMonth = moment().add(1, 'month').startOf('month');
        let startDate = firstOfNextMonth.add(13, 'days').format('MM/DD/YYYY'); // outputs MM/14/YYYY
        let endDate = moment().add(numberOfMonthsToRecur, 'months').endOf('month').format('MM/DD/YYYY'); // outputs MM+4/lateDateOfMonth/YYYY ex 12/31/2019     
        let updatedDescription = 'Update weekly to monthly for 4 months ';
        let timeOnCalendarEvent = '1p';
        
        waitForTitle('Independa :: Community Calendars');
        let newEventElem = $('a*='+ recurringEventId); 
        newEventElem.waitForDisplayed();
        newEventElem.click();
        CalendarPage.repeatSelect.selectByVisibleText('Monthly');
        CalendarPage.descripition.setValue(updatedDescription);
        browser.execute( () => {
            document.getElementById("id_ends_on").readOnly = false;
            document.getElementById("id_date_start").readOnly = false;
          });
        CalendarPage.startTime.setValue(startTime);
        CalendarPage.startDate.setValue(startDate);
        CalendarPage.endDate.setValue(endDate);
        CalendarPage.saveBtn.click();
        CalendarPage.saveUpdateFutureEventsBtn.waitForDisplayed();
        CalendarPage.saveUpdateFutureEventsBtn.click();
        CalendarPage.confirmSaveFutureEventsBtn.waitForDisplayed();
        CalendarPage.confirmSaveFutureEventsBtn.click();
        browser.setTimeout({ 'pageLoad': 10000 });
        StatusMessagePage.messageTextEquals('Event updated successfully');
        StatusMessagePage.toastMessage.waitForDisplayed(10000, true);
        browser.setTimeout({ 'pageLoad': 10000 });
        //checks that the monthly event is visible for numberOfMonthsToRecur
        for(let i = 0; i < numberOfMonthsToRecur; i++) {
            CalendarPage.monthHeader.waitForDisplayed();
            console.log('month: ', CalendarPage.monthHeader.getText()); 
            CalendarPage.expectEventCreated(recurringEventId, timeOnCalendarEvent); //current month
            CalendarPage.nextArrowBtn.click();
        }

        //check that the monthly event is NOT visible on month 4
        let oneMonthPastRecurrence = moment(endDate).add(1, 'month').format('MMMM YYYY'); // ex. August 2019   
        expect(CalendarPage.monthHeader.getText()).to.equal(oneMonthPastRecurrence); 
        CalendarPage.calendarTable.waitForExist();
        let eventElem = $('a*=' + recurringEventId);
        let isElemVisible = eventElem.isExisting();
        expect(isElemVisible).to.be.false;

    });

    //Test this out tomorrow.....

    it('Test4: should update test3 monthly to yearly', () => {
        //take the event from test 3 and update it to occur from MM+1/15/YYYY - MM+1/16/YYYY+1 (07/15/2020)
        let updatedDescription = 'Update from monthly to yearly';
        let startDate = moment().format('MM/15/YYYY');
        let endDate = moment().add(1, 'month').add(1, 'year').format('MM/16/YYYY');
        let test4StartTime = '2:00 PM';
        browser.refresh();
        StatusMessagePage.toastMessage.waitForDisplayed(10000, true);
        waitForTitle('Independa :: Community Calendars');
        browser.waitUntil(()=> (CalendarPage.loadingScreen.waitForDisplayed(15000,true)), 15000, 'error "loading icon" still visible');
        StatusMessagePage.toastMessage.waitForDisplayed(10000, true);

        CalendarPage.nextArrowBtn.waitForDisplayed();
        CalendarPage.nextArrowBtn.click();
        let newEventElem = $('a*='+ recurringEventId); 
        newEventElem.waitForDisplayed();
        newEventElem.click();
        CalendarPage.repeatSelect.selectByVisibleText('Yearly');
        CalendarPage.descripition.setValue(updatedDescription);
        browser.execute( () => {
            document.getElementById("id_ends_on").readOnly = false;
            document.getElementById("id_date_start").readOnly = false;
          });
        CalendarPage.startTime.setValue(test4StartTime);
        CalendarPage.startDate.setValue(startDate); //6/15/2019 current date is 6/4/2019
        CalendarPage.endDate.setValue(endDate); //7/16/2020
        CalendarPage.saveBtn.click();
        CalendarPage.saveUpdateFutureEventsBtn.waitForDisplayed();
        CalendarPage.saveUpdateFutureEventsBtn.click();
        CalendarPage.confirmSaveFutureEventsBtn.waitForDisplayed();
        CalendarPage.confirmSaveFutureEventsBtn.click();
        browser.setTimeout({ 'pageLoad': 10000 });
        StatusMessagePage.messageTextEquals('Event updated successfully');
        //TODO: add expect for checking there are two events on the calendar for this month and next year(this month)
   });
});

