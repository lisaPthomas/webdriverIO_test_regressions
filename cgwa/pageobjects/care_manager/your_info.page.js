import Page from '../page.js';
import StatusMessagePage from '../status_message.page.js';


class YourInfoPage extends Page {
    get changeUserNameBtn() {return $('a[modal-link="change_username_modal"]');}
    get changePasswordNameBtn() {return $('a[modal-link="change_password_modal"]');}
    // Page Elements
    get header() {return $('#your_info h2:nth-of-type(1)');}

    //Your_Info Form Fields
    get emailAddress() {return $('#id_email');}
    //get upload img
    get firstName() {return $('#id_first_name');}
    get lastName() {return $('#id_last_name');}
    // get status() {return $('');}
    // get preferredLanguage() {return $('');}
    get timeZoneSelect() {return $('#dk5-id_timezone');} //might need to go in
    get easternTime() {return $('#dk5-id_timezone li[data-value="US/Eastern"]');}
    get pacificTime() {return $('#dk5-id_timezone li[data-value="US/Pacific"]');}
    get tempUnitSelect() {return $('#dk6-id_temperature_unit');}
    get tempUnitCelcius() {return $('#dk6-celsius');}
    get tempUnitFahrenheit() {return $('#dk6-fahrenheit');}
    get weightUnitSelect() {return $('#dk7-id_body_weight_unit');}
    get pounds() {return $('#dk7-pounds');}
    get kilograms() {return $('#dk7-kg');}
    get mobile() {return $('#id_mobile_phone');}
    get otherPhone() {return $('#id_other_phone');}
    get address() {return $('#id_shipping_address1');}
    get city() {return $('#id_shipping_city');}
    get stateSelect() {return $('#dk8-id_shipping_state');}
    get florida() {return $('li[data-value="FL"]');}
    get zip() {return $('#id_shipping_zip_code');}
    get countrySelect() {return $('#dk9-id_shipping_country');}
    get unitedStates() {return $('#dk9-US');}
    get videoChatCallCheckBox() {return $('#id_enable_video_chat');}
    get videoChatCheckBoxIsSelected() {return $('input[checked="checked"][id="id_enable_video_chat"]');}
    get notes() {return $('#id_notes');}
    get saveInfoBtn() {return $('.content_footer .button_green');}

    //change username modal
    get username() {return $('#id_username');}
    get usernameConfirm() {return $('#id_username_confirm');}
    get currentPassword() {return $('#id_current_password');}
    get saveUserNameBtn() {return $('.form_header:nth-of-type(1) .button_green');}

    //change password modal
    get newPassword() {return $('#id_password1');}
    get currentPW() {return $('#change_password_form .field_current_password input');}
    get confirmPassword() {return $('#id_password2');}
    get savePasswordBtn() {return $('#change_password_form .form_footer .button_green');}

    changeUserName(x) {
        this.changeUserNameBtn.click();
        this.username.waitForDisplayed();
        this.username.setValue(x);
        this.usernameConfirm.setValue(x);
        this.currentPassword.setValue(password);
        this.saveUserNameBtn.click();
        browser.refresh();
        browser.setTimeout({ 'pageLoad': 10000 });
        this.emailAddress.waitForDisplayed();
        let emailSavedText = this.emailAddress.getValue();
        expect(emailSavedText).to.equal(x);
    };

    passwordChange(currentPassword, newPassword) {
        this.changePasswordNameBtn.click();
        this.currentPW.waitForDisplayed();
        this.currentPW.setValue(currentPassword);
        this.newPassword.setValue(newPassword);
        this.confirmPassword.setValue(newPassword);
        this.savePasswordBtn.click();
        StatusMessagePage.messageTextEquals('Your password has been changed successfully.');
        StatusMessagePage.toastMessage.waitForDisplayed(10000, true);
    };
}

export default new YourInfoPage();