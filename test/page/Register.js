import BasePage from './BasePage';

class Register extends BasePage {
    goToPage() {
        super.goToPage(this.signInLink, 'Sign in Link');
    }

    get signInLink() { return $('.login'); }
    get createAccountHeader() { return $('//*[@id="create-account_form"]/h3'); }
    get emailAddressField() { return $('#email_create'); }
    get getEmailAddressClassAttribute() { return $('//*[@id="create-account_form"]/div/div[2]'); }
    get createAccountBtn() { return $('#SubmitCreate'); }
    get invalidEmailErr() { return $('//*[@id="create_account_error"]/ol/li'); }
    get personalInfoHeader() { return $('//*[@id="account-creation_form"]/div[1]/h3'); }
    get registerBtn() { return $('#submitAccount'); }
    get listOfErrorMsgs() { return $$('//*[@id="center_column"]/div/ol/li'); }
    get personalInfo_firstName() { return $('#customer_firstname'); }
    get personalInfo_lastName() { return $('#customer_lastname'); }
    get personalInfo_email() { return $('#email'); }
    get personalInfo_password() { return $('#passwd'); }
    get personalInfo_dobDays() { return $('#days'); }
    get personalInfo_dobMonth() { return $('#months'); }
    get personalInfo_dobYears() { return $('#years') }
    get address_FirstName() { return $('#firstname'); }
    get address_LastName() { return $('#lastname'); }
    get address() { return $('#address1'); }
    get city() { return $('#city'); }
    get state() { return $('#id_state'); }
    get zipCode() { return $('#postcode'); }
    get country() { return $('#id_country'); }
    get mobilePhone() { return $('#phone_mobile'); }
    get address_Alias() { return $('#alias'); }
    get submitBtn() { return $('#submitAccount'); }
    get myAccountInfoMsg() { return $('.info-account'); }
    get myAccountName() { return $('//*[@id="header"]/div[2]/div/div/nav/div[1]/a/span'); }

    clearAllRegistrationFields() {
        this.personalInfo_firstName.clearValue();
        this.personalInfo_lastName.clearValue();
        this.personalInfo_email.clearValue();
        this.personalInfo_password.clearValue();
        this.personalInfo_dobDays.selectByVisibleText('-');
        this.personalInfo_dobMonth.selectByVisibleText('-');
        this.personalInfo_dobYears.selectByVisibleText('-');
        this.address_FirstName.clearValue();
        this.address_LastName.clearValue();
        this.address.clearValue();
        this.city.clearValue();
        this.state.selectByVisibleText('-');
        this.zipCode.clearValue();
        this.country.selectByVisibleText('-');
        this.mobilePhone.clearValue();
        this.address_Alias.clearValue();
    }
    
    fillOutRegistrationForm(data) {
        this.personalInfo_firstName.addValue(data.get('firstName'));
        this.personalInfo_lastName.addValue(data.get('lastName'));
        this.personalInfo_email.addValue(data.get('email'));
        this.personalInfo_password.addValue(data.get('password'));

        var dobArr = data.get('dateOfBirth').split('/');
        this.personalInfo_dobDays.selectByAttribute("value", dobArr[1]);
        this.personalInfo_dobMonth.selectByAttribute("value", dobArr[0]);
        this.personalInfo_dobYears.selectByAttribute("value", dobArr[2]);

        this.address_FirstName.addValue(data.get('firstName'));
        this.address_LastName.addValue(data.get('lastName'));
        this.address.addValue(data.get('address'));
        this.city.addValue(data.get('city'));
        this.country.selectByVisibleText(data.get('country'));
        this.mobilePhone.addValue(data.get('mobilePhone'));
        this.address_Alias.addValue(data.get('alias'));
        // need to add these 2 last because for some reason, those 2 fields do not show up until others are filled
        this.state.selectByVisibleText(data.get('state'));
        this.zipCode.addValue(data.get('zipCode'));
    }
}

export default new Register();