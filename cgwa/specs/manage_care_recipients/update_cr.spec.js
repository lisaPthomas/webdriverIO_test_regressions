import LoginPage from '../../pageobjects/login.page.js';
import DashboardPage from '../../pageobjects/care_manager/dashboard.page.js';
import CrFormPage from '../../pageobjects/care_recipient/cr_form.page.js';

describe("manage_care_recipients/update_cr", () => {
    before('Login', () => {
        LoginPage.login();
    });

    const p = {
            firstName: "Auto",
            lastName: "Test" + makeId(5),
            updatedFirstName: 'Updated',
            updatedLastName: 'UpLast' + makeId(6),
            email: 'ATest1234@test.com',
            updatedEmail: 'ATest5678@gmail.com',
            primaryPhone: '5555555555', 
            updatedPrimaryPhone: '6666666666',
            secondaryPhone: '7777777777',
            updatedSecondaryPhone: '8888888888',
            address: '200 Test Dr',
            updatedAddress: '201 Test Street',
            zip: '10001',
            updatedZip: '92115',
            interests: 'Morning Walking',
            updatedInterests: 'Morning Walking and Running',
           //  floorNumber: '3A',
           //  updatedFloorNumber: '3B',
           //  roomNumber: '365A',
           //  updatedRoomNumber: '365B',
           //  building: '11455 El Camino',
           //  updatedBuilding: '11466 The Road',
            notes: 'Test Notes 5 AM: Test234, n/Test_23434',
            updatedNotes: 'Test Test Notes Notes 5 5 AM AM:: Test234, Test234, n/Test_23434 n/Test_23434',
    }

    it('Update Care Recipient - test 1', () => {
        DashboardPage.addCareRecipient(p);
        CrFormPage.openEditPage(p.lastName);
        //----- Step 1 ---------
        //Not: Depending on User Permissions, these fields are hidden or showing: relationships, 
        CrFormPage.birthdayMonthDiv.click();
        CrFormPage.birthdayMonthFeb.click();
        CrFormPage.birthdayDayDiv.click();
        CrFormPage.birthdayDay3.click();        
        CrFormPage.birthdayYearDiv.click();
        CrFormPage.birthdayYear2015.waitForExist();
        CrFormPage.birthdayYear2015.click();
        CrFormPage.primaryPhone.setValue(p.updatedPrimaryPhone);        
        CrFormPage.secondaryPhone.setValue(p.updatedSecondaryPhone);
        //TODO: Will Need a set of consistent data for TVs to Test Assigning TV
        CrFormPage.address.setValue(p.updatedAddress);
        CrFormPage.firstName.setValue(p.updatedFirstName);
        CrFormPage.lastName.setValue(p.updatedLastName);
        CrFormPage.city.setValue('San Diego');
        CrFormPage.stateDiv.click();
        CrFormPage.stateCA.click();
        CrFormPage.zip.setValue(p.updatedZip);
        CrFormPage.email.setValue(p.updatedEmail);
        CrFormPage.interests.setValue(p.updatedInterests);
        //TODO: permission needed on local
        // CrFormPage.floorNumber.setValue(updatedFloorNumber);
        // CrFormPage.roomNumber.setValue(updatedRoomNumber);
        // CrFormPage.building.setValue(updatedBuilding);
        CrFormPage.allCMLocationCheckbox.click();
        CrFormPage.notes.setValue(p.updatedNotes);
        CrFormPage.footerNextBtn.click();
        //----- Step 2 ---------
        CrFormPage.languageDiv.waitForDisplayed(2000);
        CrFormPage.languageDiv.click();
        CrFormPage.languageEs.waitForDisplayed(500);
        CrFormPage.languageEs.click();
        // CrFormPage.timeZoneDiv.waitForExist(2000);
        // CrFormPage.timeZoneDiv.click();
        // CrFormPage.timeZoneEST.waitForExist(5000);
        // CrFormPage.timeZoneEST.click();
        CrFormPage.temperatureDiv.click();
        CrFormPage.temperatureC.click();
        CrFormPage.weightUnitsDiv.click();
        CrFormPage.weightUnitsKg.waitForExist();
        CrFormPage.weightUnitsKg.click();
        CrFormPage.skilledNursingCheckbox.click();
        CrFormPage.footerNextBtn.click();
        //----- Step 3 -----
        //TODO: update groups when consistent group data exists
        CrFormPage.diabetesCheckbox.waitForExist(3000);
        CrFormPage.diabetesCheckbox.click();
        CrFormPage.memoryLossCheckbox.click();
        CrFormPage.saveBtn.click();
        //TODO: add expects for all fields
        waitForTitle('Independa :: Manage Care Recipients');
        const tableData = DashboardPage.namesTableData.getText();
        expect(tableData).to.contain(p.updatedFirstName);
        expect(tableData).to.contain(p.updatedLastName);
        expect(tableData).to.contain('02/03/2015');
        expect(tableData).to.contain('Diabetes, Memory Loss');
        CrFormPage.openEditPage(p.updatedFirstName);
        CrFormPage.primaryPhone.waitForExist(3000);
        expect(CrFormPage.primaryPhone.getHTML()).to.contain('6666666666');
        expect(CrFormPage.secondaryPhone.getHTML()).to.contain('8888888888');
        expect(CrFormPage.email.getValue()).to.equal(p.updatedEmail);     
        expect(CrFormPage.interests.getValue()).to.equal(p.updatedInterests); 
        expect(CrFormPage.notes.getText()).to.equal(p.updatedNotes);
        expect(CrFormPage.address.getValue()).to.equal(p.updatedAddress);
        expect(CrFormPage.city.getValue()).to.equal('San Diego');
        expect(CrFormPage.stateDiv.getText()).to.equal('California');
        expect(CrFormPage.allCMLocationCheckbox.isSelected(), 'expected allCM location checkbox to be checked').to.be.true;
        CrFormPage.footerNextBtn.click();
        CrFormPage.skilledNursingCheckbox.waitForDisplayed();
        expect(CrFormPage.languageDiv.getText()).to.equal('Espanol');
        expect(CrFormPage.temperatureDiv.getText()).to.equal('Celsius (C)');
        expect(CrFormPage.weightUnitsDiv.getText()).to.equal('Kilograms (Kg)');
        expect(CrFormPage.skilledNursingCheckbox.isSelected(), 'expected skilled nursing checkbox to be checked').to.be.true;
        CrFormPage.footerNextBtn.click();
        expect(CrFormPage.diabetesCheckbox.isSelected(), 'expected diabetes checkbox to be checked').to.be.true;
        expect(CrFormPage.memoryLossCheckbox.isSelected(), 'expected memory loss checkbox to be checked').to.be.true;
    }); 

    it('Delete Updated Care Recipient from test 1', () => {
        browser.url('/dashboard');
        waitForTitle('Independa :: Care Provider Dashboard');
        DashboardPage.deleteCareRecipient(p.updatedLastName);
    });

})