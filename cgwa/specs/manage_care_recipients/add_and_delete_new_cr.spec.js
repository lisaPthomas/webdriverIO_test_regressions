import LoginPage from '../../pageobjects/login.page.js';
import DashboardPage from '../../pageobjects/care_manager/dashboard.page.js';
import CrFormPage from '../../pageobjects/care_recipient/cr_form.page.js';

describe("manage_care_recipients/add_and_delete_new_cr", () => {
    before('Login', () => {
        LoginPage.login();
    });

    const personToAdd = {
        img: currentDirectory + '/assets/man_and_dog.jpg',
        firstName: "Auto",
        lastName: "Test" + makeId(5),
        email: 'ATest1234@test.com',
        primaryPhone: '5555555555', 
        secondaryPhone: '7777777777',
        address: '200 Test Dr',
        zip: '10001',
        interests: 'Morning Walking',
        notes: 'Test Notes 5 AM: Test234, n/Test_23434',
    }

    it('Create Care Recipient with Img - test 1', () => {
        DashboardPage.addCareRecipient(personToAdd);
        DashboardPage.addCareRecipientBtn.waitForDisplayed(5000);
        waitForTitle('Independa :: Manage Care Recipients');
        const tableData = DashboardPage.namesTableData.getText();
        expect(tableData).to.contain(personToAdd.firstName);
        expect(tableData).to.contain(personToAdd.lastName);
    });

    it('Delete Added Care Recipient from test 1', () => {
        DashboardPage.deleteCareRecipient(personToAdd.lastName);
    });

});