import Page from '../page.js';

class CrFormPage extends Page {

    get header() {return $('#manage_crs h1')}
    //FIELDS
    //---- Step 1 ----
    get firstName() {return $('#id_first_name');}
    get lastName() {return $('#id_last_name');}
    get firstNameInvalid() {return $('div[ng-show="first_name_error"]');}
    get lastNameInvalid() {return $('div[ng-show="last_name_error"]');}
    get tvBoxList() {return $('#dk2-combobox');}
    get primaryPhone() {return $('#id_phone_primary');}
    get secondaryPhone() {return $('#id_phone_secondary');}
    get email() {return $('#id_email');}
    get interests() {return $('#id_interests');}
    get birthdayMonthDiv() {return $('div[id*="id_birthday_month"');} //

    //TODO:Need to add method to change the id to select specific month
    get birthdayMonthJan() {return $('div[id*="id_birthday_month"] li[data-value="1"]');}
    get birthdayMonthFeb() {return $('div[id*="id_birthday_month"] li[data-value="2"]');}
    get birthdayDayDiv() {return $('div[id*="id_birthday_day"]');}
    get birthdayDay2() {return $('div[id*="id_birthday_day"] li[data-value="2"]');}
    get birthdayDay3() {return $('div[id*="id_birthday_day"] li[data-value="3"]');}
    get birthdayYearDiv() {return $('div[id*="id_birthday_year"]');}
    get birthdayYear2016() {return $('div[id*="id_birthday_year"] li[data-value="2016"]');}
    get birthdayYear2015() {return $('div[id*="id_birthday_year"] li[data-value="2015"]');}
    get address() {return $('#id_address1');}
    get zip() {return $('#id_zip_code');}
    get floorNumber() {return $('#id_floor_number');}
    get roomNumber() {return $('#id_room_number');}
    get building() {return $('#id_building');}
    get notes() {return $('#id_notes');}
    get allCMLocationCheckbox() {return $('#id_all_cm_relationships');}
    get city() {return $('#id_city');}
    get stateDiv() {return $('div[id*="id_state"]');}
    get stateCA() {return $('div[id*="id_state"] li[data-value="CA"]');}
    
    //---- Step 2 ----
    get languageDiv() {return $('div[id*="id_language"]');}
    get languageEs() {return $('div[id*="id_language"] li[data-value="es"]');}
    get timeZoneDiv() {return $('.column_full .field_timezone div.dk-select');}
    //this element is not existing....
    //get timeZoneEST() {return $('ul#dk10-listbox #dk10-US/Eastern');}
    get temperatureDiv() {return $('div[id*="id_temperature_unit"]');}
    get temperatureF() {return $('div[id*="id_temperature_unit"] li[data-value="fahrenheit"]');}
    get temperatureC() {return $('div[id*="id_temperature_unit"] li[data-value="celsius"]');}
    get weightUnitsDiv() {return $('div[id*="id_body_weight_unit"]');}
    get weightUnitsPounds() {return $('div[id*="id_body_weight_unit"] li[data-value="pounds"]');}
    get weightUnitsKg() {return $('div[id*="id_body_weight_unit"] li[data-value="kg"]');}
    get independentLivingCheckbox() {return $('#id_community_calendars_0');}
    get skilledNursingCheckbox() {return $('#id_community_calendars_1');}
    get assistedLivingCheckbox() {return $('#id_community_calendars_2');}
    get fitnessCheckbox() {return $('#id_community_calendars_3');}
    
    //---- Step 3 ------
    get diabetesCheckbox() {return $('#id_medical_conditions_9');}
    get memoryLossCheckbox() {return $('#id_age_related_conditions_6');}
    
    //ACTIONS
    get nextBtn() {return $('.content_header a.button_green');}
    get footerNextBtn() {return $('.content_footer a.button_green');}
    get saveBtn() {return $('.content_footer #cr-save-button');}
    get backBtnHide() {return $('.content_header a.button.hide')};
    get deleteBtn() {return $('.content_footer .button_red');}
    
    openEditPage(lastName) {
        const editBtn = $('tr*=' + lastName).$('.edit');
        editBtn.waitForDisplayed(5000);
        editBtn.click();
    }
}

export default new CrFormPage();