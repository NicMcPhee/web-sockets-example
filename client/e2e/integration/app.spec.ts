import { AppPage } from '../support/app.po';

const page = new AppPage();

describe('App', () => {
  beforeEach(() => page.navigateTo());

  it('Should load', () => {
    //page.navigateTo();
    cy.document().should('exist');
  });

  it('Should have the correct title', () => {
    page.getAppTitle().should('contain', 'CSCI 3601 Iteration Template');
  });

  describe('Sidenav', () => {
    it('Should be invisible by default', () => {
      // Before clicking on the button, the sidenav should be hidden
      page.getSidenav()
        .should('be.hidden')
        .and('not.be.visible');
    });

    it('Should be openable by clicking the sidenav button', () => {
      page.getSidenavButton().click();

      page.getSidenav()
        .should('not.be.hidden')
        .and('be.visible');
    });

    it('Should have a working navigation to "Users"', () => {
      page.getSidenavButton().click();
      page.getSidenav();
      page.getNavLink('Users').click();
      cy.url().should('match', /.*\/users$/);
    });


    it('Should have a working navigation to "Home"', () => {
      page.getSidenavButton().click();
      page.getNavLink('Home').click();
      cy.url().should('match', /.*\/$/);
    });
  });

});
