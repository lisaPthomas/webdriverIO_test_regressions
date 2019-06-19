import Page from './page.js';

class SharedPage extends Page {
    get loadingScreen() {return $('#loading_screen');}

    waitForLoadingScreenNotVisible() {
        browser.waitUntil(()=> (this.loadingScreen.waitForDisplayed(15000,true)), 15000, 'loading icon still visible after 15s');
    }
}

export default new SharedPage();