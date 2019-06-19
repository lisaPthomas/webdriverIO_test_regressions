import Page from '../page.js';
import StatusMessagePage from '../status_message.page.js'
class ManageTVPage extends Page {
    get addTVbtn() {return $('#manage_tvs .button_green');}

    //Table Elements 
    get tvNames() {return $$('.sorting_1');}
    get regCodes() {return $$('.sorting_1 + td');}
    get serialNums() {return $$('.sorting_1 + td + td');}
    get assignees() {return $$('.sorting_1 + td + td + td');}

    //Add TV Page
    get nameTV() {return $('#id_name');}
    get deviceIdentifier() {return $('#id_mac_address');}
    get saveBtn() {return $('.content_header .add_tv.button_green');}
    get editBtn() {return $('.content_header .edit_tv.button_green');}
    get deleteBtn() {return $('.content_header .delete_tv');}
    get cancelBtn() {return $('.content_header a.button');} 
    get requiredDiv() {return $('#id_name + div');}

    addNewTV(name, deviceID) {
        this.addTVbtn.waitForDisplayed();
        this.addTVbtn.click();
        waitForTitle('Independa :: Add TV');
        this.nameTV.setValue(name);
        if(deviceID) {
            this.deviceIdentifier.setValue(deviceID);
        }
        this.saveBtn.click();
        StatusMessagePage.messageTextEquals('Successfully added TV');
        waitForTitle('Independa :: Manage TVs and AnyTV Companions');
    }
}

export default new ManageTVPage();