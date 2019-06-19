import Page from './page';

class LoginPage extends Page {
    get userName() {return $('#id_username')};

    get password() {return $('#id_password')};

    get loginButton()  {return $('input[value="Login"]')};

    open() {
        browser.url("/");
    };

    login(u = userName, p = password) {
        this.open();
        this.userName.setValue(u);
        this.password.setValue(p);
        this.loginButton.click();
        waitForTitle('Independa :: Care Provider Dashboard');
    };

}

export default new LoginPage();
