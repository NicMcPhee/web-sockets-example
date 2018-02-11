import {UserPage} from './user-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
    let args = arguments;

    // queue 100ms wait between test
    //This delay is only put here so that you can watch the browser do its' thing.
    //If you're tired of it taking long you can remove this call
    origFn.call(browser.driver.controlFlow(), function () {
        return protractor.promise.delayed(100);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};

describe('User list', () => {
    let page: UserPage;

    beforeEach(() => {
        page = new UserPage();
    });

    it('should get and highlight User Name attribute ', () => {
        page.navigateTo();
        expect(page.getUserTitle()).toEqual('User Name');
    });

    it('should type something in filter name box and check that it returned correct element', () => {
        page.navigateTo();
        page.typeAName("Lynn");
        expect(page.getFirstUser()).toEqual("Lynn Ferguson is 25 years old");
    });

    it('should type 27 into the age field and return 3 elements ', () => {
        page.navigateTo();
        page.getUserByAge(27);

        expect(page.getFirstUser()).toEqual("Stokes Clayton is 27 years old");

        page.typeAName("Merrill");

        expect(page.getFirstUser()).toEqual("Merrill Parker is 27 years old");

    });
});
