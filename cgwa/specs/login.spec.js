import LoginPage from '../pageobjects/login.page.js';

describe("Login Specs", function() { 

    it('Should login global user', function() {
        LoginPage.login();
        waitForTitle('Independa :: Care Provider Dashboard');
    })
});
