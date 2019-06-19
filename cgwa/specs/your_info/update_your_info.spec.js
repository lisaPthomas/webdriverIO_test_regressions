//uload a new photo, persists after saving
//able to edit details, first name, last name time zone, other fields

import LoginPage from '../../pageobjects/login.page.js';
import YourInfoPage from '../../pageobjects/care_manager/your_info.page.js';
import StatusMessagePage from '../../pageobjects/status_message.page.js'
import fileUploaderPage from '../../pageobjects/fileUploader.page.js';

describe('your_info/update_your_info', () => {
    let firstName;
    let lastName;

    before('Login', () => {
        LoginPage.login();
        browser.url('/myaccount/myinfo');
        waitForTitle('Independa :: Your Info');

        firstName = YourInfoPage.firstName.getValue();
        lastName = YourInfoPage.lastName.getValue();
    });


    it('Updates Your Info, first, last, numbers, timezones', () => {
        let photo = currentDirectory + '/assets/nurse_woman.jpg';
        fileUploaderPage.uploadImgToCloudinary(photo);
        YourInfoPage.firstName.setValue('Test123');
        YourInfoPage.lastName.setValue('Example456');
        YourInfoPage.timeZoneSelect.click();
        YourInfoPage.easternTime.waitForDisplayed();
        YourInfoPage.easternTime.click();
        YourInfoPage.tempUnitSelect.click();
        YourInfoPage.tempUnitCelcius.click();
        YourInfoPage.weightUnitSelect.click();
        YourInfoPage.kilograms.click();
        //status -- 
        //preferred language -- 
        //need to set phone number with keypress otherwise set value adds numbers out of order
        let setPhoneNumber = (phoneNumber) => {
            let i = 0;
            while(i < phoneNumber.length) {
                browser.keys(phoneNumber[i]);
                i++;
            }
        }
        let mobileNumber = '4088318772';
        YourInfoPage.mobile.click();
        setPhoneNumber(mobileNumber);
        let otherNumber = '6192291212';
        YourInfoPage.otherPhone.click();
        setPhoneNumber(otherNumber);
  
        YourInfoPage.address.setValue('3040 Test Dr');
        YourInfoPage.city.setValue('Ponte Vedra');
        YourInfoPage.stateSelect.click();
        YourInfoPage.florida.click();
        YourInfoPage.zip.setValue('32081');
        YourInfoPage.countrySelect.click();
        let isVideoChatChecked = YourInfoPage.videoChatCheckBoxIsSelected.isExisting();
        if (isVideoChatChecked) {
            //uncheck checkbox
            YourInfoPage.videoChatCallCheckBox.click();
        }
        YourInfoPage.notes.setValue('Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat.');
        YourInfoPage.saveInfoBtn.click();
        StatusMessagePage.messageTextEquals('Your information was updated successfully!');
        browser.refresh();
        let firstNameText = YourInfoPage.firstName.getValue();
        let lastNameText = YourInfoPage.lastName.getValue();
        let mobileNumberText = YourInfoPage.mobile.getValue();
        let otherPhoneText = YourInfoPage.otherPhone.getValue();
        let tempUnitText = YourInfoPage.tempUnitSelect.getText();
        let timeZoneText = YourInfoPage.timeZoneSelect.getText();
        let unitsText = YourInfoPage.weightUnitSelect.getText();
        let addressText = YourInfoPage.address.getValue();
        let cityText = YourInfoPage.city.getValue();
        let stateText = YourInfoPage.stateSelect.getText();
        let zipText = YourInfoPage.zip.getValue();
        let countryText = YourInfoPage.countrySelect.getText();
        let noteText = YourInfoPage.notes.getText();
        let videoChatUnselected = YourInfoPage.videoChatCheckBoxIsSelected.isExisting();
        let headerText = $('h2*=Test123').getText();

        expect(firstNameText).to.equal('Test123');
        expect(lastNameText).to.equal('Example456');
        expect(mobileNumberText).to.equal('(408) 831-8772');
        expect(otherPhoneText).to.equal('(619) 229-1212');
        expect(timeZoneText).to.equal('US/Eastern');
        expect(tempUnitText).to.equal('Celsius (C)');
        expect(unitsText).to.equal('Kilograms (Kg)');
        expect(addressText).to.equal('3040 Test Dr');
        expect(cityText).to.equal('Ponte Vedra');
        expect(stateText).to.equal('Florida');
        expect(zipText).to.equal('32081');
        expect(countryText).to.equal('United States');
        expect(noteText).to.equal('Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat.')
        expect(headerText).to.contain('Test123 Example456');
        expect(videoChatUnselected, 'expect video chat checkbox to not be selected').to.be.false;
    });

    it('Set Timezone, Name, Video Checkbox, and Units Back to Default', () => {
        browser.url('/myaccount/myinfo');
        waitForTitle('Independa :: Your Info');
        YourInfoPage.firstName.setValue(firstName);
        YourInfoPage.lastName.setValue(lastName);
        YourInfoPage.timeZoneSelect.click();
        YourInfoPage.pacificTime.waitForDisplayed();
        YourInfoPage.pacificTime.click();
        YourInfoPage.tempUnitSelect.click();
        YourInfoPage.tempUnitFahrenheit.click();
        YourInfoPage.weightUnitSelect.click();
        YourInfoPage.pounds.click();
        YourInfoPage.videoChatCallCheckBox.click();
        YourInfoPage.saveInfoBtn.click();
        StatusMessagePage.messageTextEquals('Your information was updated successfully!');
        browser.refresh();
        let firstNameText = YourInfoPage.firstName.getValue();
        let lastNameText = YourInfoPage.lastName.getValue();
        let mobileNumberText = YourInfoPage.mobile.getValue();
        let otherPhoneText = YourInfoPage.otherPhone.getValue();
        let tempUnitText = YourInfoPage.tempUnitSelect.getText();
        let timeZoneText = YourInfoPage.timeZoneSelect.getText();
        let unitsText = YourInfoPage.weightUnitSelect.getText();
        let addressText = YourInfoPage.address.getValue();
        let cityText = YourInfoPage.city.getValue();
        let stateText = YourInfoPage.stateSelect.getText();
        let zipText = YourInfoPage.zip.getValue();
        let countryText = YourInfoPage.countrySelect.getText();
        let noteText = YourInfoPage.notes.getText();
        let isVideoChatChecked = YourInfoPage.videoChatCheckBoxIsSelected.isExisting();

        expect(firstNameText).to.equal(firstName);
        expect(lastNameText).to.equal(lastName);
        expect(mobileNumberText).to.equal('(408) 831-8772');
        expect(otherPhoneText).to.equal('(619) 229-1212');
        expect(timeZoneText).to.equal('US/Pacific');
        expect(tempUnitText).to.equal('Fahrenheit (F)');
        expect(unitsText).to.equal('Pounds (Lbs)');
        expect(addressText).to.equal('3040 Test Dr');
        expect(cityText).to.equal('Ponte Vedra');
        expect(stateText).to.equal('Florida');
        expect(zipText).to.equal('32081');
        expect(noteText).to.equal('Donec rutrum congue leo eget malesuada. Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat.')
        expect(isVideoChatChecked).to.be.true;
        expect(countryText).to.equal('United States');
    });
});