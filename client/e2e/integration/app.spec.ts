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

  it('Should open the sidenav', () => {
    page.navigateTo();

    // Before clicking on the button, the sidenav should be hidden
    page.getSidenav()
      .should('be.hidden')
      .and('not.be.visible');

    page.getSidenavButton().click();

    page.getSidenav()
      .should('not.be.hidden')
      .and('be.visible');
  });


});
