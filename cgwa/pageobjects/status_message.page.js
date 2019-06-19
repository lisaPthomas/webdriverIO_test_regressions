import Page from './page';

class StatusMessagePage extends Page {
    get toastMessage() {return $('#status_message .status_message_box');}

    messageTextEquals(msg) {
        this.toastMessage.waitForDisplayed();
        let toastText = this.toastMessage.getText();
        expect(toastText).to.equal(msg);
    }
}

export default new StatusMessagePage();