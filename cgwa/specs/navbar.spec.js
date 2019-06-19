import LoginPage from '../pageobjects/login.page.js';
import NavBarPage from '../pageobjects/navbar.page.js';

describe("Should Test NavBar Links", () => {
    before('opens login', () => {
        LoginPage.login();
    })
    
    //Test After Testing alert page so title is different
    it("Logo should open dashboard", () => {
        NavBarPage.logo.click();
        const dashboardTitle = browser.getTitle();
        expect(dashboardTitle).to.equal("Independa :: Care Provider Dashboard");
    });

});