import {browser, protractor, by, element} from 'protractor';
import { AddUserPage } from './add-user.po';

describe('Add user', () => {
  let page: AddUserPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new AddUserPage();
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    expect(page.getTitle()).toEqual('New User');
  });

});
