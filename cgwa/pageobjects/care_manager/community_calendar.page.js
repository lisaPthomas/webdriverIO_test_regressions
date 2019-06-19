import Page from '../page.js';
let moment = require('moment');

class CalendarPage extends Page {
    get todayDiv() {return $('.fc-content-skeleton .fc-today');}
    get calendarTable() {return $('.fc-content-skeleton tbody');}
    get displayIndependentCalendarCheckbox() {return $('div.calendar_name*=Independent');}
    get displaySkilledCalendarCheckbox() {return $('div.calendar_name*=Skilled');}
    get monthHeader() {return $('.fc-center h2');}
    get nextArrowBtn() {return $('.fc-next-button');}
    
    //Add/Edit event modal
    // --- STEP 1 ---
    get eventName() {return $('#id_title');}
    get startDate() {return $('#id_date_start');}
    get endDate() {return $('#id_ends_on');}
    get startTime() {return $('#id_time_start');}
    get durationTime() {return $('#id_duration_0');}
    get durationSelect() {return $('#id_duration_1');}
    get durationHoursOption() {return $('#id_duration_1 option[value="60"]');}
    get durationMinuteOption() {return $('#id_duration_1 option[value="1"]');}
    get repeatSelect() {return $('#id_repeats');}
    dayOfWeek(dayOfWeek) {
        return $('input[value="' + dayOfWeek + '"]');
    }
    get descripition() {return $('#id_description');}
    get locationInput() {return $('#id_location');}
    get youTubeUrlInput() {return $('#id_youtube_url');}
    get typeDropdown() {return $('#id_display_type');}
    get typeExerciseOption() {return $('#id_display_type option[value="5"]');}
    get benefitDropdown() {return $('#id_primary_benefit');}
    get benefitSpiritualOption() {return $('#id_primary_benefit option[value="3"]');}
    get skilledNursingCheckbox() {return $('input[name="shared_calendars"]:nth-of-type(1)');}
    
    // --- STEP 2 ---
    get rsvpCheckbox() {return $('#id_require_rsvp');}
    get addGuestBtn() {return $('.field a.button');}
    get guestListItem() {return $('.guest_list ul li div.item');}
    get attendingLabel() {return $('.form_content[ng-show="currentStep === 2"] .column_half:nth-child(3) .guest_list label');}
    get guestListDiv() {return $('.form_content[ng-show="currentStep === 2"] .column_half:nth-child(3) .guest_list div.item');}
    

    // Modal Buttons
    get nextBtn() {return $('.form_footer a.button_green:not(.ng-hide)');}
    get saveBtn() {return $('.button_green[value="Save"]');}
    get deleteBtn() {return $('.form_footer a.button_red');}
    get confirmDelete() {return $('div[ng-show="isConfirmDeletePopupShowing"] .button_green');}
    //changing start date will make saveUpdateAllEventsBtn disabled
    get saveUpdateAllEventsBtn() {return $('a[ng-click="clickUpdateAllRecurringEvents()"]');}
    get saveUpdateFutureEventsBtn() {return $('a[ng-click="clickUpdateFutureRecurringEvents()"]');} 
    get confirmSaveAllRecurringEventsBtn() {return $('a[ng-click="updateAllRecurringEvents(event_form.$valid)"]');}
    get confirmSaveFutureEventsBtn() {return $('a[ng-click="updateFutureRecurringEvents(event_form.$valid)"]');}    
    get deleteAllEventsBtn() {return $('.modal_box .modal_footer .button_green[ng-click="deleteAllRecurringEvents(); mixpanelReport(\'delete-event\')"]');}

    get loadingScreen() {return $('#loading_screen');}

    openAddEventModalForDay(date) {
        let data_date = moment().format(date);
        let fifteenthElem = $('.fc-content-skeleton td[data-date="' + data_date + '"]');
        fifteenthElem.waitForDisplayed();
        fifteenthElem.click();
    }

    createSimpleEvent(title, description) {
        this.todayDiv.waitForDisplayed();
        this.todayDiv.click();
        
        // Add Event
        this.eventName.waitForDisplayed();
        this.eventName.setValue(title);
        this.descripition.setValue(description);
        this.nextBtn.click();
        this.saveBtn.waitForDisplayed();
        this.saveBtn.click();
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });
    }

    expectEventCreated(id, time) {
        waitForTitle('Independa :: Community Calendars');
        this.calendarTable.waitForExist();
        let newEventElem = $('a*=' + id);
        newEventElem.waitForDisplayed();
        let eventText = newEventElem.getText(); // ex. '5p IJDtD5 Auto Test Event'
        expect(eventText).to.contain(id);
        if(time) {
            expect(eventText).to.contain(time);
        }
    }
}

export default new CalendarPage();