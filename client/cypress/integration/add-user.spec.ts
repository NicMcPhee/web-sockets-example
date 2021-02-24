import { User } from 'src/app/users/user';
import { AddUserPage } from '../support/add-user.po';

describe('Add user', () => {
  const page = new AddUserPage();

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTitle().should('have.text', 'New User');
  });

  it('Should enable and disable the add user button', () => {
    // ADD USER button should be disabled until all the necessary fields
    // are filled. Once the last (`#emailField`) is filled, then the button should
    // become enabled.
    page.addUserButton().should('be.disabled');
    page.typeInput(cy.get('#nameField'), 'test');
    page.addUserButton().should('be.disabled');
    page.typeInput(cy.get('#ageField'), '20');
    page.addUserButton().should('be.disabled');
    page.typeInput(cy.get('#emailField'), 'invalid');
    page.addUserButton().should('be.disabled');
    page.typeInput(cy.get('#emailField'), 'user@example.com');
    // all the required fields have valid input, then it should be enabled
    page.addUserButton().should('be.enabled');
  });

  describe('Adding a new user', () => {

    const user: User = {
      _id: null,
      name: 'Test User',
      age: 30,
      company: 'Test Company',
      email: 'test@example.com',
      role: 'editor'
    };

    beforeEach(() => {
      cy.task('seed:database');
    });

    it('Should go to the right page, and have the right info', () => {
      page.addUser(user);

      // New URL should end in the 24 hex character Mongo ID of the newly added user
      cy.url()
        .should('match', /\/users\/[0-9a-fA-F]{24}$/)
        .should('not.match', /\/users\/new$/);

      cy.get('.user-card-name').should('have.text', user.name);
      cy.get('.user-card-company').should('have.text', user.company);
      cy.get('.user-card-role').should('have.text', user.role);
      cy.get('.user-card-age').should('have.text', user.age);
      cy.get('.user-card-email').should('have.text', user.email);

      cy.get('.mat-simple-snackbar').should('have.text', `Added User ${user.name}`);
    });
  });

});
