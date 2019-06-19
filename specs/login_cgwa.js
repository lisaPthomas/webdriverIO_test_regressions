const assert = require('assert');

describe('Login page', () => {
    browser.url('/');

    it.only('should have the right title', () => {
        const title = browser.getTitle();
        assert.equal(title, 'Independa :: Login');
    });
    it('should set our username', (done) => {
        const username = 'cg@independa.com';
        const username_field = $('#id_username')
        username_field.addValue(username)
        assert.equal(username_field.getValue(), username)
        done
    });
    it('should set our password', (done) => {
        const password = 'Independa1'
        const password_field = $('#id_password')
        password_field.addValue(password)
        assert.equal(password_field.getValue(), password)
        done
    });
    it('should log us in', (done) => {
        const login_button = $('input[value="Login"]')
        login_button.click()
        browser.waitUntil(() => {
            return (browser.getTitle() === 'Independa :: Care Provider Dashboard')
        }, 10000)
        assert.equal(browser.getTitle(), 'Independa :: Care Provider Dashboard')
        done
    });
});
