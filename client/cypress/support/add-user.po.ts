import {User} from 'src/app/users/user';

export class AddUserPage {
  navigateTo() {
    return cy.visit('/users/new');
  }

  getTitle() {
    return cy.get('.add-user-title');
  }

  addUserButton() {
    return cy.get('[data-test=confirmAddUserButton]');
  }

  typeInput(input: Cypress.Chainable, text: string, clear = true) {
    if(clear) {
      input.clear();
    }
    return input.type(text);
  }

  selectMatSelectValue(select: Cypress.Chainable, value: string) {
    return select.click().get(`mat-option[value="${value}"]`).click();
  }

  addUser(newUser: User) {
    this.typeInput(cy.get('#nameField'), newUser.name);
    this.typeInput(cy.get('#ageField'), newUser.age.toString());
    if (newUser.company) {
      this.typeInput(cy.get('#companyField'), newUser.company);
    }
    if (newUser.email) {
      this.typeInput(cy.get('#emailField'), newUser.email);
    }
    this.selectMatSelectValue(cy.get('#roleField'), newUser.role);
    return this.addUserButton().click();
  }
}
