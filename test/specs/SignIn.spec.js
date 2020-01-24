import SignIn from '../page/SignIn';

describe('Opening to Sign page', () => {
    it('Should load Sign in Page', () => {
        SignIn.goToPage();
        expect(SignIn.signInSubHeader.getText()).to.equal('ALREADY REGISTERED?');
    });
});

describe('Validate error messages', () => {
    it('Should display email error message when no fields are entered and sign in button is clicked', () => {
        SignIn.signInBtn.click();
        expect(SignIn.errMsg.getText()).to.equal('An email address required.');
    });

    it('Enter invalid email and validate error message', () => {
        SignIn.email.addValue("asdf");
        SignIn.signInBtn.click();
        expect(SignIn.errMsg.getText()).to.equal('Invalid email address.');
    });

    it('Enter valid email and no password, validate error message', () => {
        SignIn.password.addValue("asdf");
        SignIn.signInBtn.click();
        expect(SignIn.errMsg.getText()).to.equal('An email address required.');
    });
    
    it('Enter valid email format and incorrect password, validate error message', () => {
        SignIn.signIn('johnDoe21@yahoo.com', 'Password');
        expect(SignIn.errMsg.getText()).to.equal('Authentication failed.');
    });
});

describe('Sigin Successfully', () => {
    it('Should enter email and password and sign in successfully', () => {
        SignIn.signIn('johnDoe21@yahoo.com', 'JohnDoe1');
        SignIn.waitUntilElementExists(SignIn.myAccountInfo);
        expect(SignIn.myAccountInfo.getText()).to.equal('Welcome to your account. Here you can manage all of your personal information and orders.');
        expect(SignIn.signInName.getText()).to.equal('John Doe');
    });
});