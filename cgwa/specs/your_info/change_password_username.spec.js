import LoginPage from '../../pageobjects/login.page.js';
import YourInfoPage from '../../pageobjects/care_manager/your_info.page.js';

describe('your_info/change_password_username', () => {
    before('login', () => {
        LoginPage.login();
    });

    let newUserName = 'test1234@gmail.com';
    //let newUserName = 'lthomas@independa.com'
    let newPassword = 'Inde505!';

    it('Change username and set it back to original', () => {
        browser.url('/myaccount/myinfo/');
        waitForTitle('Independa :: Your Info');
        YourInfoPage.changeUserName(newUserName);
    });

    it('Logout, login with new userName, and change username back to default', () => {
        browser.url('/accounts/logout');
        waitForTitle('Independa :: Login');
        LoginPage.login(newUserName, password);
        browser.url('/myaccount/myinfo/');
        waitForTitle('Independa :: Your Info');
        YourInfoPage.changeUserName(userName);
    });

    it('Change password and login with new password', () => {
        browser.url('/myaccount/myinfo/');
        waitForTitle('Independa :: Your Info');
        YourInfoPage.passwordChange(password, newPassword);
    });
    
    it('Change password back to default', () => {
        browser.url('/accounts/logout');
        waitForTitle('Independa :: Login');
        LoginPage.login(userName, newPassword);
        browser.url('/myaccount/myinfo/');
        YourInfoPage.passwordChange(newPassword, password);

        //login again with defaults
        browser.url('/accounts/logout');
        waitForTitle('Independa :: Login');
        LoginPage.login();
    });
});