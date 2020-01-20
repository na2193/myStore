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
    get firstName() { return $('#customer_firstname'); }
}

export default new Register();