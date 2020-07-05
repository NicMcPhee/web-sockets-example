import { UserListPage } from '../support/user-list.po';
import { arrayBufferToBlob } from 'cypress/types/blob-util';

const page = new UserListPage();

describe('User list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    // expect(page.getUserTitle()).toEqual('Users');
    page.getUserTitle().should('have.text', 'Users');
  });

  it('Should type something in the name filter and check that it returned correct elements', () => {
    // await page.typeInput('user-name-input', 'Lynn Ferguson');
    cy.get('#user-name-input').type('Lynn Ferguson')

    // All of the user cards should have the name we are filtering by
    page.getUserCards().each(e => {
      cy.wrap(e).find('.user-card-name').should('have.text', 'Lynn Ferguson');
      // expect(e.element(by.className('user-card-name')).getText()).toEqual('Lynn Ferguson');
    });

    page.getUserCards().find('.user-card-name').each($el =>
      expect($el.text()).to.equal('Lynn Ferguson')
    );
  });

  it('Should type something in the company filter and check that it returned correct elements', () => {
    //   await page.typeInput('user-company-input', 'OHMNET');
    cy.get('#user-company-input').type('OHMNET');

    // All of the user cards should have the company we are filtering by
    page.getUserCards().find('.user-card-company').each($card => {
      cy.wrap($card).should('have.text', 'OHMNET');
    });
  });

  it('Should type something partial in the company filter and check that it returned correct elements', () => {
    //   await page.typeInput('user-company-input', 'ti');
    cy.get('#user-company-input').type('ti');

    //   // Go through each of the cards that are being shown and get the companies
    //   const companies = await page.getUserCards().map(e => e.element(by.className('user-card-company')).getText());

    //   // We should see these companies
    //   expect(companies).toContain('MOMENTIA');
    //   expect(companies).toContain('KINETICUT');

    //   // We shouldn't see these companies
    //   expect(companies).not.toContain('DATAGENE');
    //   expect(companies).not.toContain('OHMNET');
    page.getUserCards().find('.user-card-company')
    .should('contain.text', 'MOMENTIA')
    .should('contain.text', 'KINETICUT')
    .should('not.contain.text', 'DATAGENE')
    .should('not.contain.text', 'OHMNET');
  });

  it('Should type something in the age filter and check that it returned correct elements', () => {
    //   await page.typeInput('user-age-input', '27');
    cy.get('#user-age-input').type('27');

    //   // Go through each of the cards that are being shown and get the names
    //   const names = await page.getUserCards().map(e => e.element(by.className('user-card-name')).getText());

    //   // We should see these users whose age is 27
    //   expect(names).toContain('Stokes Clayton');
    //   expect(names).toContain('Bolton Monroe');
    //   expect(names).toContain('Merrill Parker');

    //   // We shouldn't see these users
    //   expect(names).not.toContain('Connie Stewart');
    //   expect(names).not.toContain('Lynn Ferguson');
    page.getUserCards().find('.user-card-name')
    .should('contain.text', 'Stokes Clayton')
    .should('contain.text', 'Bolton Monroe')
    .should('contain.text', 'Merrill Parker')
    .should('not.contain.text', 'Connie Stewart')
    .should('not.contain.text', 'Lynn Ferguson');
  });

  it('Should change the view', () => {
    //   await page.changeView('list');
    page.changeView('list');

    //   expect(page.getUserCards().count()).toEqual(0); // There should be no cards
    //   expect(page.getUserListItems().count()).toBeGreaterThan(0); // There should be list items
    page.getUserCards().should('not.exist');
    page.getUserListItems().should('exist');
  });

  it('Should select a role, switch the view, and check that it returned correct elements', () => {
    //   await page.selectMatSelectValue('user-role-select', 'viewer');
    page.selectRole('viewer');

    //   await page.changeView('list');
    page.changeView('list');

    //   expect(page.getUserListItems().count()).toBeGreaterThan(0);
    page.getUserListItems().should('exist');

    // All of the user list items should have the role we are looking for
    page.getUserListItems().each(e => {
      cy.wrap(e).find('.user-list-role').should('have.text', ' viewer '); // this seems fragile since the spaces are expected
    });
  });

  it('Should click view profile on a user and go to the right URL', () => {
    page.changeView('card');
    let firstUserName;
    let firstUserCompany;

    page.getUserCards().first().should(card => {
      firstUserName = card.find('.user-card-name').text();
      console.log(firstUserName);
      firstUserCompany = card.find('.user-card-company').text();
      console.log(firstUserCompany);
    }).then(() => {
      console.log(firstUserName);
      console.log(firstUserCompany);
      page.getUserCards().find('button').first().click({ force: true});
      // When the view profile button on the first user card is clicked, the URL should have a valid mongo ID
      //   await page.clickViewProfile(page.getUserCards().first());

      // Wait until the URL contains 'users/' (note the ending slash)
      //   await browser.wait(EC.urlContains('users/'), 10000);
      //   expect(RegExp('.*\/users\/[0-9a-fA-F]{24}$', 'i').test(url)).toBe(true);
      cy.url()
        .should('contain', '/users/')
        .should('match', /.*\/users\/[0-9a-fA-F]{24}$/);

      // On this profile page we were sent to, the name and company should be correct
      //   expect(element(by.className('user-card-company')).getText()).toEqual(firstUserCompany);
      cy.get('.user-card-name').first().should('have.text', firstUserName);
      cy.get('.user-card-company').first().should('have.text', firstUserCompany);
    });
   });

  it('Should click add user and go to the right URL', () => {
    //   await page.clickAddUserFAB();
    page.addUserFAB().click();
    //   // Wait until the URL contains 'users/new'
    //   await browser.wait(EC.urlContains('users/new'), 10000);
    cy.url().should('contain', 'users/new');

    //   // When the view profile button on the first user card is clicked, we should be sent to the right URL
    //   const url = await page.getUrl();
    //   expect(url.endsWith('/users/new')).toBe(true);
    cy.url().should(url => expect(url.endsWith('users/new')).to.be.true);

    //   // On this profile page we were sent to, We should see the right title
    //   expect(element(by.className('add-user-title')).getText()).toEqual('New User');
    cy.get('.add-user-title').should('have.text', 'New User');
  });

});
