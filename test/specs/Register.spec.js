import Register from '../page/Register';

describe('Opening My Store Page', () => {
    it('Should load My Store Home Page', () => {
        Register.goToPage();
        expect(Register.createAccountHeader.getText()).to.equal('CREATE AN ACCOUNT');
    });
});

describe('Testing email address validation message', () => {
    it('Should display Invalid email address when the field is blank and clicked on Create an account', () => {
        Register.createAccountBtn.click();
        Register.waitUntilElementExists(Register.invalidEmailErr);
        expect(Register.invalidEmailErr.isDisplayed()).to.be.true;
        expect(Register.invalidEmailErr.getText()).to.equal('Invalid email address.');
    });

    it('Should display Invalid email address when incorrect email address is entered and clicked on Create an account', () => {
        Register.emailAddressField.addValue('test@');
        Register.createAccountBtn.click();
        Register.waitUntilElementExists(Register.invalidEmailErr);
        expect(Register.invalidEmailErr.isDisplayed()).to.be.true;
        expect(Register.invalidEmailErr.getText()).to.equal('Invalid email address.');
    });

    it('Should show a Red X on the text field for invalid email address', () => {
        Register.emailAddressField.clearValue();
        Register.emailAddressField.addValue('test@');
        expect(Register.getEmailAddressClassAttribute.getAttribute('class')).to.equal('form-group form-error');
     });

    it('Should show a Green check mark on the text field for a valid email address', () => {
        Register.emailAddressField.clearValue();
        Register.emailAddressField.addValue('test@email.com');
        Register.createAccountHeader.click(); // to click elsewhere so the field gets updated
        expect(Register.getEmailAddressClassAttribute.getAttribute('class')).to.equal('form-group form-ok');
    });
});

describe('Going to Registration Form Page', () => {
    it('Should fill out email address and click on Create an account button', () => {
        Register.emailAddressField.clearValue();
        Register.emailAddressField.addValue('testAuto21@yahoo.com');
        Register.createAccountBtn.click();
    });

    it('Should validate Registration Form Page is displayed', () => {
        Register.waitUntilElementExists(Register.personalInfoHeader);
        expect(Register.personalInfoHeader.getText()).to.equal('YOUR PERSONAL INFORMATION');
    });
});

describe('Testing validation messages for Registration Form', () => {
    const expectedErrMsgs = [
        'You must register at least one phone number.',
        'lastname is required.',
        'firstname is required.',
        'passwd is required.',
        'address1 is required.',
        'city is required.',
        "The Zip/Postal code you've entered is invalid. It must follow this format: 00000",
        'This country requires you to choose a State.'
    ];

    it('Should get all 8 validation messages when all the fields are empty and validate them', () => {
        Register.registerBtn.click();

        let uiErrMsgs = Register.listOfErrorMsgs;
        for(var i = 0; i < uiErrMsgs.length; i++) {
            if(uiErrMsgs[i].getText() === expectedErrMsgs[i]) {
               // console.log('UI -> ' + uiErrMsgs[i].getText());
                //console.log('DATA -> ' + expectedErrMsgs[i]);
                assert.isTrue(true, 'The 8 validation messages are the same as expected');
            }
            else {
                //console.log('UI -> ' + uiErrMsgs[i].getText());
                //console.log('DATA -> ' + expectedErrMsgs[i]);
                assert.fail('The 8 validation messages are NOT the same as the expected values');
            }
        }
    });

    it('When entering first Name, the error message should not include first name', () => { 
        Register.personalInfo_firstName.addValue('John');
        Register.registerBtn.click();
        let uiErrMsgs = Register.listOfErrorMsgs;

        uiErrMsgs.forEach(element => {
            expect(element.getText()).to.be.oneOf(expectedErrMsgs);
            assert.notEqual(element.getText(), 'firstname is required.', 'The First Name error message is displayed in the error list as NOT Expected');
        });
    });

    it('When entering last Name, the error message should not include last name', () => { 
        Register.personalInfo_lastName.addValue('Doe');
        Register.registerBtn.click();
        let uiErrMsgs = Register.listOfErrorMsgs;

        uiErrMsgs.forEach(element => {
            expect(element.getText()).to.be.oneOf(expectedErrMsgs);
            assert.notEqual(element.getText(), 'lastname is required.', 'The Last Name error message is displayed in the error list as NOT Expected');
        });
    });

    it('When entering password, the error message should not include password', () => { 
        Register.personalInfo_password.addValue('password123');
        Register.registerBtn.click();
        let uiErrMsgs = Register.listOfErrorMsgs;
    
        uiErrMsgs.forEach(element => {
            expect(element.getText()).to.be.oneOf(expectedErrMsgs);
            assert.notEqual(element.getText(), 'passwd is required.', 'The Password error message is displayed in the error list as NOT Expected');
        });
    });
    
    it('When entering address, the error message should not include address', () => { 
        Register.address.addValue('123 street road');
        Register.registerBtn.click();
        let uiErrMsgs = Register.listOfErrorMsgs;
    
        uiErrMsgs.forEach(element => {
            expect(element.getText()).to.be.oneOf(expectedErrMsgs);
            assert.notEqual(element.getText(), 'address1 is required.', 'The Address error message is displayed in the error list as NOT Expected');
        });
    });

    it('When entering city, the error message should not include city ', () => { 
        Register.city.addValue('Springfield');
        Register.registerBtn.click();
        let uiErrMsgs = Register.listOfErrorMsgs;
    
        uiErrMsgs.forEach(element => {
            expect(element.getText()).to.be.oneOf(expectedErrMsgs);
            assert.notEqual(element.getText(), 'city is required.', 'The City error message is displayed in the error list as NOT Expected');
        });
    });

    it('When entering zip code, the error message should not include zip code', () => { 
        Register.zipCode.addValue('20122');
        Register.registerBtn.click();
        let uiErrMsgs = Register.listOfErrorMsgs;
    
        uiErrMsgs.forEach(element => {
            expect(element.getText()).to.be.oneOf(expectedErrMsgs);
            assert.notEqual(element.getText(), "The Zip/Postal code you've entered is invalid. It must follow this format: 00000", 'The Zip Code error message is displayed in the error list as NOT Expected');
        });
    });

    it('When entering country, the error message should not include country', () => { 
        Register.country.selectByVisibleText('United States');
        Register.registerBtn.click();
        let uiErrMsgs = Register.listOfErrorMsgs;
    
        uiErrMsgs.forEach(element => {
            expect(element.getText()).to.be.oneOf(expectedErrMsgs);
            assert.notEqual(element.getText(), 'This country requires you to choose a State.', 'The Country error message is displayed in the error list as NOT Expected');
        });
    });

    it('When entering all the fields with an existing email, the email address should be displayed', () => { 
        Register.clearAllRegistrationFields();
        let registrationData = new Map();
        registrationData.set('firstName', 'John');
        registrationData.set('lastName', 'Doe');
        registrationData.set('email', 'johnDoe21@yahoo.com');
        registrationData.set('password', 'JohnDoe1');
        registrationData.set('dateOfBirth', '5/21/1998');
        registrationData.set('address', '123 Street Road');
        registrationData.set('city', 'Springfield');
        registrationData.set('state', 'Virginia');
        registrationData.set('zipCode', '20155');
        registrationData.set('country', 'United States');
        registrationData.set('mobilePhone', '571-888-9080');
        registrationData.set('alias', 'John Doe Info');

        Register.fillOutRegistrationForm(registrationData);
        Register.waitUntilElementisClickable(Register.submitBtn, 'Register Button');
        Register.submitBtn.click();

        let uiErrMsgs = Register.listOfErrorMsgs;
    
        uiErrMsgs.forEach(element => {
            expect(element.getText()).to.equal('An account using this email address has already been registered.');
        });
    });
});



describe('Enter valid data for registration form and register', () => {
    it('Should clear all fields', () => {
        Register.clearAllRegistrationFields();
    });

    it('Should enter valid data', () => {
        // probably store these data in a db or excel 
        // and convert the data to map
        let registrationData = new Map();
        registrationData.set('firstName', 'John');
        registrationData.set('lastName', 'Doe');
        registrationData.set('email', 'johnDoe21@yahoo.com');
        registrationData.set('password', 'JohnDoe1');
        registrationData.set('dateOfBirth', '5/21/1998');
        registrationData.set('address', '123 Street Road');
        registrationData.set('city', 'Springfield');
        registrationData.set('state', 'Virginia');
        registrationData.set('zipCode', '20155');
        registrationData.set('country', 'United States');
        registrationData.set('mobilePhone', '571-888-9080');
        registrationData.set('alias', 'John Doe Info');

        Register.fillOutRegistrationForm(registrationData);
    });

    it('Should click on Register', () => {
        Register.waitUntilElementisClickable(Register.submitBtn, 'Register Button');
        Register.submitBtn.click();
    });

    it('Should validate Registration Successfull', () => {
        Register.waitUntilElementVisible(Register.myAccountInfoMsg);
        expect(Register.myAccountInfoMsg.getText()).to.equal('Welcome to your account. Here you can manage all of your personal information and orders.');
        expect(Register.myAccountName.getText()).to.equal('John Doe');

    });
});