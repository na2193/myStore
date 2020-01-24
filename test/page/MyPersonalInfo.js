import BasePage from './BasePage';

class MyPersonalInfo extends BasePage {
    goToPage() {
        super.goToPage(this.signInLink, 'Sign in Link');
        
        // first click on sign
        // enter credentials and sign in
        // click on my personal info

    }
}

export default new MyPersonalInfo();