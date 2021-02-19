import { AddUserPage, TestUser } from '../support/add-user.po';
import { E2EUtil } from '../support/e2e.util';

describe('Add user', () => {
  const page = new AddUserPage();

  beforeEach(() => {
    page.navigateTo();
  });

  after(() => {
    // Lets put the db back to its original state before we leave.
    //cy.task('seed:database');
  });

  it('Should have the correct title', () => {
    page.getTitle().should('have.text', 'New User');
  });

  it('Should enable and disable the add user button', () => {
    // ADD USER button should be disabled until...
    page.addUserButton().should('be.disabled');
    page.typeInput('nameField', 'test');
    page.addUserButton().should('be.disabled');
    page.typeInput('ageField', '20');
    page.addUserButton().should('be.disabled');
    page.typeInput('emailField', 'invalid');
    page.addUserButton().should('be.disabled');
    page.typeInput('emailField', 'user@example.com');
    // all the required fields have valid input, then it should be enabled
    page.addUserButton().should('be.enabled');
  });

  describe('Adding a new user', () => {

    const user: TestUser = {
      name: 'Test User',
      age: '30',
      company: 'Test Company',
      email: 'test@example.com',
      role: 'editor'
    };

    beforeEach(() => {
      cy.task('seed:database');
    });

    it('Should go to the right page, and have the right info', () => {
      page.addUser(user);

      cy.url()
        .should('match', /.*\/users\/[0-9a-fA-F]{24}$/)
        .should('not.match', /.*\/users\/new$/);

      cy.get('.user-card-name').should('have.text', user.name);
      cy.get('.user-card-company').should('have.text', user.company);
      cy.get('.user-card-role').should('have.text', user.role);
      cy.get('.user-card-age').should('have.text', user.age);
      cy.get('.user-card-email').should('have.text', user.email);

      page.checkSnackbar(user.name);
    });
  });

});
