class BasePage {
    goToPage(pageLocator, pageDesc) {
        browser.url('/');
        browser.maximizeWindow();
        this.waitUntilElementisClickable(pageLocator, pageDesc);
        pageLocator.click();
    }

    waitUntilElementisClickable(locator, elemDesc) {
        locator.waitForClickable({
            timeout: 3000,
            timeoutMsg: 'Unable to wait for element -> ' + elemDesc + ' to be clickable'
        });
    }

    waitUntilElementIsLoaded(locator, textToVerify) {
        browser.waitUntil(() => {
            return $(locator).getText() === textToVerify;
        }, 3000, 'Unable to load the Page and find -> ' + textToVerify);
    }

    waitUntilElementExists(locator) {
        locator.waitForExist(3000);
    }

    waitUntilElementVisible(locator) {
        locator.waitForDisplayed(3000);
    }
}

export default BasePage;