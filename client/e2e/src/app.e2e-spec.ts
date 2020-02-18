import {AppPage} from './app.po';

describe('angular-spark-lab', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should load', () => {
    page.navigateTo();
  });

  it('should have the correct title', () => {
    page.navigateTo();
    expect(page.getAppTitle()).toEqual("CSCI 3601 Lab 3");
  });
});
