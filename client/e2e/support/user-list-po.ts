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

  clickViewProfile(card: Cypress.Chainable<HTMLElement>) {
    // return card.element(by.buttonText('VIEW PROFILE')).click();
    return card.contains('VIEW PROFILE').click();
  }

  changeView(viewType: 'card' | 'list') {
    return cy.get(`#view-type-radio .mat-radio-button[value="${viewType}"]`).check();
  }

  addUserFAB() {
    return cy.get('.add-user-fab');
  }
}
