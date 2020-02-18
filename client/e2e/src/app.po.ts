import {browser, element, by} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getAppTitle() {
    return element(by.className('app-title')).getText();
  }

}
