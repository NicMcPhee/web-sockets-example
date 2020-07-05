export class UserListPage {
  navigateTo() {
    return cy.visit('/users');
  }

  getUrl() {
    return cy.url();
  }

  getUserTitle() {
    return cy.get('.user-list-title');
  }

  getUserCards() {
    return cy.get('.user-cards-container app-user-card');
  }

  getUserListItems() {
    // return element(by.className('user-nav-list')).all(by.className('user-list-item'));
    return cy.get('.user-nav-list .user-list-item');
  }

  clickViewProfile(card: Cypress.Chainable<JQuery<HTMLElement>>) {
    // return card.element(by.buttonText('VIEW PROFILE')).click();
    return card.find('button');
  }

  changeView(viewType: 'card' | 'list') {
    // in the test of changing the view, .check will not work if you look for mat-radio-button
    // or, basically anything other than :radio and it will never be ready to click,
    // so you have to use force: true as an option to not wait for it to be ready
    return cy.get(`:radio[value="${viewType}"]`).check({ force: true }).click({ force: true });
  }

  selectRole(value: string) {
    // This is messy. I'm not sure that Cypress is working well for us here. Might want to find a better way.
    return cy.get('#user-role-select').click({ force: true }).get(`mat-option[value="${value}"]`).type('{enter');
  }

  addUserFAB() {
    return cy.get('.add-user-fab');
  }
}
