import Page from './page';

class NavBarPage extends Page {
    get logo() {return $('#logo')};

}

export default new NavBarPage();
