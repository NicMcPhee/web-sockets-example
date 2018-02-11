import {browser, element, by, Key} from 'protractor';

export class UserPage {
    navigateTo() {
        return browser.get('/users');
    }

    //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return "highlighted";
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getUserTitle() {
        let title = element(by.id('title')).getText();
        this.highlightElement(by.id('title'));

        return title;
    }

    typeAName(name: string) {
        let input = element(by.className('name-input'));
        input.click();
        input.sendKeys(name);
    }

    selectUpKey() {
        browser.actions().sendKeys(Key.ARROW_UP).perform();
    }

    getUserByAge(age: number) {
        let input = element(by.className('age-input'));
        input.click();
        input.sendKeys(age);
    }

    getFirstUser() {
        let user = element.all(by.className('users')).first().getText();
        this.highlightElement(by.className('users'));
        return user;
    }
}
