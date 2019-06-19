import LoginPage from '../../pageobjects/login.page.js';
import CalendarPage from '../../pageobjects/care_manager/community_calendar.page.js';
let moment = require('moment');

describe('community_calendar/update_one_event', () => {
    before('Should Login', ()=> {
        LoginPage.login();
    });

    beforeEach('Should navigate to community calendar', () => {
        browser.url('/Facility/calendar/view');
        waitForTitle('Independa :: Community Calendars');
        browser.waitUntil(() => (CalendarPage.loadingScreen.waitForDisplayed(15000, true)), 15000, 'Loading page is still visible');        
    });

    it('Create event for today, update to start the 24th of this month', () => {
        let newEventId = makeId(6);
        let updatedId = makeId(6);
        let eventTitle = newEventId + 'Update Event';
        let updatedEventTitle = updatedId + ' Updated';
        let description = 'This is an auto test for';
        let updatedDescription = description + ' ' + updatedId;

        CalendarPage.createSimpleEvent(eventTitle, description);
        CalendarPage.expectEventCreated(newEventId);
        let newEventElem = $('a*='+ newEventId); 
        newEventElem.waitForDisplayed();
        newEventElem.click();
        CalendarPage.eventName.waitForDisplayed();
        CalendarPage.eventName.setValue(updatedEventTitle);
        CalendarPage.descripition.setValue(updatedDescription);
        browser.execute( () => {
            document.getElementById("id_date_start").readOnly = false;
          });
        let twentyFourthDay = moment().format('MM/24/YYYY');
        CalendarPage.startDate.setValue(twentyFourthDay);
        CalendarPage.startTime.setValue('5:00 PM');
        CalendarPage.durationTime.setValue('2');
        CalendarPage.durationSelect.click();
        CalendarPage.durationHoursOption.click();
        CalendarPage.locationInput.setValue('Conference Rm 1');
        CalendarPage.typeDropdown.click();
        CalendarPage.typeExerciseOption.click();
        CalendarPage.benefitDropdown.click();
        CalendarPage.benefitSpiritualOption.click();
        CalendarPage.skilledNursingCheckbox.click(); //selecting this will create two events
        CalendarPage.nextBtn.click();
        CalendarPage.rsvpCheckbox.click();
        CalendarPage.addGuestBtn.click();
        let isGuestAdded = CalendarPage.guestListItem.isExisting();
        expect(isGuestAdded, 'expected guest to be added to calendar event').to.be.true;
        CalendarPage.saveBtn.click();
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });

        //expect two events to exist with same updatedId 
        waitForTitle('Independa :: Community Calendars');
        CalendarPage.todayDiv.waitForDisplayed();
        CalendarPage.displayIndependentCalendarCheckbox.waitForDisplayed();
        if(CalendarPage.displaySkilledCalendarCheckbox.isSelected()) {
            CalendarPage.displaySkilledCalendarCheckbox.click();
        }
        CalendarPage.expectEventCreated(updatedId, '5p');
        let updatedEventElem = $('a*=' + updatedId);
        updatedEventElem.click();
        CalendarPage.startDate.waitForDisplayed();
        CalendarPage.nextBtn.click();
        
        // content does not exist in DOM > == $0, can't call .getText() on these elements to confirm it's there...

        let isRsvpSelected = CalendarPage.rsvpCheckbox.isSelected();
        let attendingText = CalendarPage.attendingLabel.getText();
        let isGuestExisting = CalendarPage.guestListDiv.isExisting();
        expect(isRsvpSelected, 'expected rsvp checkbox to be selected').to.be.true;
        expect(attendingText).to.contain('Attending (1)');
        expect(isGuestExisting, 'expected event to have guest').to.be.true;
    });
});