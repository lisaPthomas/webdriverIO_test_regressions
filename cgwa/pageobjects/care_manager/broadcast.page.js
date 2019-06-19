import Page from '../page.js';
let moment = require('moment');

class BroadcastPage extends Page {
    //Elements
    get addBroadcastBtn() {return $('.content_header .button_green');}
    get manageCheckins() {return $('#manage_checkins');}
    get editBtn() {return $('.icons-table_edit');}
    get nextBtn() {return $('.content_header a.button_green')};

    //Broadcast Modal
    get checkinForm() {return $('#add_new_checkin_form');}
    get messageInput() {return $('#question_text');}
    get repeatSelect() {return $('#id_repeats');}
    get todayCheckbox() {return $('#id_on_' + moment().format('dddd').toLowerCase());}
    get sundayCheckbox() {return $('#id_on_sunday');}
    get mondayCheckbox() {return $('#id_on_monday');}
    get tuesdayCheckbox() {return $('#id_on_tuesday');}
    get wednesdayCheckbox() {return $('#id_on_wednesday');}
    get thursdayCheckbox() {return $('#id_on_thursday');}
    get fridayCheckbox() {return $('#id_on_friday');}
    get saturdayCheckbox() {return $('#id_on_saturday');}
    get timeInput() {return $('#id_time');}
    get saveBtn() {return $('#save-button');}
    get deleteBtn() {return $('.ng-scope .button_red');}
    get confirmDeleteForm() {return $('#delete-checkin');}
    get confirmDeleteBtn() {return $('#delete-checkin .button_green');}
    get validationError() {return $('.checkin-validation');}
    get status_message() {return $('#status_message[style="display: block;"');}
    //Actions
    createBroadcast(message, broadcastTime, messageId) {
        let broadcastMessage = messageId + ' ' + message + 
                            ' Created at ' + moment().format("MM-DD-YY HH:mm") + 
                            ' for start time: ' + broadcastTime;
        this.addBroadcastBtn.waitForDisplayed();
        this.addBroadcastBtn.click();
        this.messageInput.waitForDisplayed();
        this.messageInput.setValue(broadcastMessage);
        this.timeInput.setValue(broadcastTime);
        this.saveBtn.click();
    }
}

export default new BroadcastPage();