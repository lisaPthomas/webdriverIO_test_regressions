import Page from '../page.js';
import UploaderPage from '../fileUploader.page.js';
import CrFormPage from '../care_recipient/cr_form.page.js';

class DashboardPage extends Page {
    get addCareRecipientBtn() {return $('#cr_table_content_header .button_green')};

    //CR_TABLE ELEMENTS
    get namesTableData() {return $('#cr_table tbody')};

    //Actions
    addCareRecipient(cr) {
        this.addCareRecipientBtn.waitForDisplayed(4000);
        this.addCareRecipientBtn.click();        
     
        if(cr.img) {
            UploaderPage.uploadImgToCloudinary(cr.img);
        }
        //---- Step 1 -------
        CrFormPage.firstName.setValue(cr.firstName);
        CrFormPage.lastName.setValue(cr.lastName);
        CrFormPage.birthdayMonthDiv.click();
        CrFormPage.birthdayMonthJan.click();
        CrFormPage.birthdayDayDiv.click();
        CrFormPage.birthdayDay2.click();
        CrFormPage.birthdayYearDiv.click();
        CrFormPage.birthdayYear2016.click();
        CrFormPage.email.setValue(cr.email);
        CrFormPage.primaryPhone.setValue(cr.primaryPhone);
        CrFormPage.secondaryPhone.setValue(cr.secondaryPhone);
        CrFormPage.address.setValue(cr.address);
        CrFormPage.zip.setValue(cr.zip);
        CrFormPage.interests.setValue(cr.interests);
        // Note: Disable these steps for now. They are disabled on local
        // CrFormPage.floorNumber.setValue(floorNumber);
        // CrFormPage.roomNumber.setValue(roomNumber);
        // CrFormPage.building.setValue(building);
        // Note: City and State will not auto populate on local
        CrFormPage.allCMLocationCheckbox.click();
        CrFormPage.notes.setValue(cr.notes);
        CrFormPage.footerNextBtn.click();
        //----- Step 2 ------
        CrFormPage.footerNextBtn.waitForDisplayed(2000);
        CrFormPage.footerNextBtn.click();
        //----- Step 3 ------
        CrFormPage.saveBtn.waitForDisplayed(3000);
        CrFormPage.saveBtn.click();
    };

    deleteCareRecipient(lastName) {
        this.addCareRecipientBtn.waitForDisplayed(2000);
        CrFormPage.openEditPage(lastName);
        waitForTitle('Independa :: Edit Care Recipient');
        CrFormPage.backBtnHide.waitForDisplayed(4000, true);
        CrFormPage.deleteBtn.waitForDisplayed(3000);
        CrFormPage.deleteBtn.scrollIntoView();
        CrFormPage.deleteBtn.click();
        browser.pause(500);
        browser.acceptAlert();
        waitForTitle('Independa :: Manage Care Recipients');
        const tableData = this.namesTableData.getText();
        this.addCareRecipientBtn.waitForDisplayed(5000);
        expect(tableData).to.not.contain(lastName, 'Error: Delete Care Recipient; Care Recipient Still Existing');
    }
}

export default new DashboardPage();