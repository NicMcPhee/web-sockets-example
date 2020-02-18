import {UserPage} from './user-list.po';
import {browser, protractor, by, element} from 'protractor';

describe('User list', () => {
  let page: UserPage;

  beforeEach(() => {
    page = new UserPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getUserTitle()).toEqual('Users');
  });

  it('Should type something in the name filter and check that it returned correct elements', () => {
    page.typeInput("user-name-input", "Lynn Ferguson");

    page.getUserCards().each(e => {
        expect(e.element(by.className("user-card-name")).getText()).toEqual("Lynn Ferguson")
    });
  });

  it('Should type something in the company filter and check that it returned correct elements', () => {
    page.typeInput("user-company-input","ti");

    let companies = page.getUserCards().map(e => e.element(by.className("user-card-company")).getText());
    expect(companies).toContain("MOMENTIA");
    expect(companies).toContain("KINETICUT");
    expect(companies).not.toContain("DATAGENE");
    expect(companies).not.toContain("OHMNET");
  });

  it('Should type something partial in the company filter and check that it returned correct elements', () => {
    page.typeInput("user-company-input","OHMNET");

    page.getUserCards().each(e => {
        expect(e.element(by.className("user-card-company")).getText()).toEqual("OHMNET")
    });
  });

  it('Should type something in the age filter and check that it returned correct elements', () => {
    page.typeInput("user-age-input","27");

    let names = page.getUserCards().map(e => e.element(by.className("user-card-name")).getText());

    expect(names).toContain("Stokes Clayton");
    expect(names).toContain("Bolton Monroe");
    expect(names).toContain("Merrill Parker");
    expect(names).not.toContain("Connie Stewart");
    expect(names).not.toContain("Lynn Ferguson");
  });

  it('Should change the view', () => {
    page.changeView('list');

    expect(page.getUserCards().count()).toEqual(0);
    expect(page.getUserListItems().count()).toBeGreaterThan(0);
  });

  it('Should select a role, switch the view, and check that it returned correct elements', () => {
    page.selectMatSelectValue("user-role-select", "viewer");

    page.changeView('list');

    page.getUserListItems().each(e => {
        expect(e.element(by.className("user-list-role")).getText()).toEqual("viewer")
    });
  });

  it('Should click view profile on a user and go to the right URL', () => {
    page.clickViewProfile(page.getUserCards().first());
    page.getUrl().then(url => {
      expect(url.endsWith("/users/588935f57546a2daea44de7c")).toBe(true);
    });
    expect(element(by.className("user-card-name")).getText()).toEqual("Connie Stewart");
  });

});
