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
    // Find and click the drop down
    return select.click()
      // Select and click the desired value from the resulting menu
      .get(`mat-option[value="${value}"]`).click();
  }

  getFormField(fieldName: string) {
    return cy.get(`mat-form-field [formcontrolname=${fieldName}]`);
  }

  addUser(newUser: User) {
    this.typeInput(this.getFormField('name'), newUser.name);
    this.typeInput(this.getFormField('age'), newUser.age.toString());
    if (newUser.company) {
      this.typeInput(this.getFormField('company'), newUser.company);
    }
    if (newUser.email) {
      this.typeInput(this.getFormField('email'), newUser.email);
    }
    this.selectMatSelectValue(this.getFormField('role'), newUser.role);
    return this.addUserButton().click();
  }
}
