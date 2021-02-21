import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Should have the correct title', () => {
    page.getAppTitle().should('contain', 'CSCI 3601 Iteration Template');
  });

  it('The sidenav should open, navigate to "Users" and back to "Home"', () => {
    // Before clicking on the button, the sidenav should be hidden
    page.getSidenav()
      .should('be.hidden')
      .and('not.be.visible');

    page.getSidenavButton().click()
      .should('not.be.hidden')
      .and('be.visible');

    page.getNavLink('Users').click();
    cy.url().should('match', /\/users$/);
    page.getSidenav()
      .should('be.hidden')
      .and('not.be.visible');

    page.getSidenavButton().click();
    page.getNavLink('Home').click();
    cy.url().should('match', /^https?:\/\/[^\/]+\/?$/);
    page.getSidenav()
      .should('be.hidden')
      .and('not.be.visible');
  });

});
