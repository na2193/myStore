import BasePage from './BasePage';

class SignIn extends BasePage {
    goToPage() {
        super.goToPage(this.signInLink, 'Sign in Link');
    }
    
    get signInLink() { return $('.login'); }
    get email() { return $('#email'); }
    get password() { return $('#passwd'); }
    get signInBtn() { return $('#SubmitLogin'); }
    get signInSubHeader() { return $('//*[@id="login_form"]/h3'); }
    get errMsg() { return $('//*[@id="center_column"]/div[1]/ol/li'); }
    get myAccountInfo() { return $('.info-account'); }
    get signInName() { return $('//*[@id="header"]/div[2]/div/div/nav/div[1]/a/span'); }

    signIn(email, password) {
        this.email.addValue(email);
        this.password.addValue(password);
        this.signInBtn.click();
    }
}

export default new SignIn();