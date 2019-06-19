import Page from './page.js';
import CrFormPage from '../pageobjects/care_recipient/cr_form.page.js';

class UploaderPage extends Page {
    get uploadPhotoBtn() {return $('.edit_button_cropper');}
    get img() {return $('.image_thumbnail');}

    //Upload IMG iFRAME ELEMENTS
    get cloudinaryWidget() {return $('#cloudinary-widget');}
    get cloudinaryWidgetIsOpened() {return $('#cloudinary-widget .opened');}
    get fileInput() {return $('#cloudinary-widget .cloudinary_fileupload');}
    get uploadBtn() {return $('.button.upload_cropped');}
    
    waitForWidgetToClose() {
        const widget = $('.panel.progress.active');
        widget.waitForExist(7000, true, 'Widget is still opened');
    }

    uploadImgToCloudinary(img) {
        this.uploadPhotoBtn.waitForExist(2000);
        this.uploadPhotoBtn.click();
        browser.switchToFrame(0);
        this.cloudinaryWidget.waitForExist(5000, false, "Error: Cloudinary Widget Does Not Exist");
        this.fileInput.addValue(img);
        browser.pause(3000);
        this.uploadBtn.waitForExist();
        this.uploadBtn.click();
        this.waitForWidgetToClose();
        browser.switchToParentFrame();
        this.img.waitForExist(4000);
        const imgSrcText = this.img.getAttribute('src');
        expect(imgSrcText).to.contain('cloudinary');
        expect(imgSrcText).to.not.contain('person_blank');
    }

    uploadPDF(pdf) {
        $('a.image_pdf_button_cloud_uploader').click();
        browser.switchToFrame(0);
        this.cloudinaryWidget.waitForExist(5000, false, "Error: Cloudinary Widget Does Not Exist");
        this.fileInput.addValue(pdf);
        this.waitForWidgetToClose();
        browser.switchToParentFrame();
        let fileText = $('a[ng-model="event.pdf"]').getText();
        expect(fileText).to.contain('.pdf');
    }
}

export default new UploaderPage();