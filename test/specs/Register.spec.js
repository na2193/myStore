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
            compare( );
        }



        if(JSON.stringify(uiErrMsgs) == JSON.stringify(expectedErrMsgs))    
            assert.isTrue(true, 'The 8 validation messages are the same as expected');
        else    
            assert.fail('The 8 validation messages are NOT the same as the expected values');
   
        // for some reason, this below does not work
        // expect(expectedErrMsgs).to.have.members(uiErrMsgs);
    });

    it('When entering first Name, the error message should not include first name', () => { 
        Register.firstName.addValue('John');
        Register.registerBtn.click();
        let uiErrMsgs = Register.listOfErrorMsgs;
        expect(uiErrMsgs).to.be.oneOf(expectedErrMsgs);
    });
});