import {browser, by, element, Key, ElementFinder} from 'protractor';

export class UserPage {
  navigateTo() {
    return browser.get('/users');
  }

  getUrl() {
    return browser.getCurrentUrl();
  }

  getUserTitle() {
    let title = element(by.className('user-list-title')).getText();
    return title;
  }

  backspace() {
    browser.actions().sendKeys(Key.BACK_SPACE).perform();
  }

  typeInput(inputId: string, text: string) {
    let input = element(by.id(inputId));
    input.click();
    input.sendKeys(text);
  }

  selectMatSelectValue(selectID: string, value: string) {
    let sel = element(by.id(selectID));
    return sel.click().then(() => {
      return element(by.css('mat-option[value="' + value + '"]')).click();
    });
  }

  getUserCards() {
    return element(by.className('user-cards-container')).all(by.tagName('app-user-card'));
  }

  getUserListItems() {
    return element(by.className('user-nav-list')).all(by.className('user-list-item'));
  }

  clickViewProfile(card: ElementFinder) {
    return card.element(by.buttonText('VIEW PROFILE')).click();
  }

  changeView(viewType: 'card' | 'list') {
    return element(by.id('view-type-radio')).element(by.css('mat-radio-button[value="' + viewType + '"]')).click();
  }
}
