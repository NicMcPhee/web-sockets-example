import {browser, by, element, Key, ElementFinder} from 'protractor';

export class AddUserPage {
  navigateTo() {
    return browser.get('/users/new');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getTitle() {
    let title = element(by.className('add-user-title')).getText();
    return title;
  }

  async typeInput(inputId: string, text: string) {
    let input = element(by.id(inputId));
    await input.click();
    await input.sendKeys(text);
  }

  selectMatSelectValue(selectID: string, value: string) {
    let sel = element(by.id(selectID));
    return sel.click().then(() => {
      return element(by.css('mat-option[value="' + value + '"]')).click();
    });
  }

  clickAddUser() {
    return element(by.buttonText('ADD USER')).click();
  }
}
