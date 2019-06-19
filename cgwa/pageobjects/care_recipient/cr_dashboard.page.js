import Page from '../page.js';

class CrDashboardPage extends Page {
    //Elements
    get editPictureText() {return $('.edit_text')};
    get editCRBtn() {return $('.dashboard_box.picture .edit_button')};
}

export default new CrDashboardPage();