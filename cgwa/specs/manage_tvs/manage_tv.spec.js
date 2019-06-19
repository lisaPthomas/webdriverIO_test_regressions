import ManageTVPage from '../../pageobjects/care_manager/manage_tv.page.js';
import LoginPage from '../../pageobjects/login.page.js';
import StatusMessagePage from '../../pageobjects/status_message.page.js';

// Test Cases
/* 1. CRUDs Manage TV Page
   2. Checks for Validation when Adding
   3. TODO: test UI: info icon and search box
*/
describe('manage_tvs/manage_tv', () => {
    before('Should Login', () => {
        LoginPage.login();
        browser.url('/DeviceAuthorization/tv/manage_tvs');
        waitForTitle('Independa :: Manage TVs and AnyTV Companions')
    });

    let name1 = "Test " + makeId(6);
    let deviceId = "TEST DEVICE" + makeId(7);

    it('Add New TV with deviceID - test 1', () => {
        ManageTVPage.addNewTV(name1, deviceId);
        let allTVNames = ManageTVPage.tvNames;
        let allTVNamesText = allTVNames.map((value) => value.getText());
        let newRegCode = $('tr*=' + name1).$('.sorting_1 + td').getText();
        expect(newRegCode).to.equal('');
        expect(allTVNamesText).to.contain(name1);
    });

    it('Deletes New TV from test 1', () => {
        let tableElem = $('tr*=' + name1).$('.edit_button');
        tableElem.click();
        ManageTVPage.deleteBtn.waitForDisplayed();
        ManageTVPage.deleteBtn.click();
        browser.acceptAlert();
        StatusMessagePage.messageTextEquals('Successfully deleted TV');
        let allTVNames = ManageTVPage.tvNames;
        let allTVNamesText = allTVNames.map((value) => value.getText());
        expect(allTVNamesText).to.not.contain(name1);
    });

    let name2 = "Test " + makeId(6);
    let updatedName = 'Updated ' + makeId(6);
    let regCode;

    it('Add New TV and Confirm Reg Code Created - test 2', () => {
        ManageTVPage.addNewTV(name2);
        let allTVNames = ManageTVPage.tvNames;
        let allTVNamesText = allTVNames.map((value) => value.getText());
        let newRegCode = $('tr*=' + name2).$('.sorting_1 + td').getText();
        regCode = newRegCode;
        expect(allTVNamesText).to.contain(name2);
        expect(newRegCode).to.have.lengthOf(7);
    });

    it('Edit TV Name from test 2', () => {
        let tableElem = $('tr*=' + name2).$('.edit_button');
        tableElem.click();
        waitForTitle('Independa :: Edit TV');
        ManageTVPage.nameTV.setValue(updatedName);
        ManageTVPage.editBtn.click();
        let allTVNames = ManageTVPage.tvNames;
        let allTVNamesText = allTVNames.map((value) => value.getText());
        let newRegCode = $('tr*=' + updatedName).$('.sorting_1 + td').getText();
        expect(newRegCode).to.equal(regCode); //should have the same regCode after Editing
        expect(allTVNamesText).to.contain(updatedName);
    });

});
