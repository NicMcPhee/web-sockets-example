import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UserService } from './user.service';
import { MockUserService } from 'src/testing/user.service.mock';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddUserComponent', () => {
  let addUserComponent: AddUserComponent;
  let calledClose: boolean;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [AddUserComponent],
      providers: [{ provide: UserService, useValue: new MockUserService() }]
    }).compileComponents().catch(error => {
      expect(error).toBeNull();
    });
  }));

  beforeEach(() => {
    calledClose = false;
    fixture = TestBed.createComponent(AddUserComponent);
    addUserComponent = fixture.componentInstance;
  });

  // Much of the code for validation was created with a lot of exploration and helpful resources including:
  // https://stackoverflow.com/questions/39910017/angular-2-custom-validation-unit-testing
  // https://stackoverflow.com/questions/52046741/angular-testbed-query-by-css-find-the-pseudo-element
  // https://angular.io/guide/form-validation
  // https://github.com/angular/angular/blob/7.2.2/packages/forms/src/validators.ts#L136-L157
  xit('should not allow a name to contain a symbol', async(() => {
    let fixture = TestBed.createComponent(AddUserComponent);
    let debug = fixture.debugElement;
    let input = debug.query(By.css('#emailField'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      input.nativeElement.value = 'bad@email.com';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();

      let form: NgForm = debug.children[0].injector.get(NgForm);
      let control = form.control.get('email');
      expect(control.hasError('notPeeskillet')).toBe(true);
      expect(form.control.valid).toEqual(false);
      expect(form.control.hasError('notPeeskillet', ['email'])).toEqual(true);

      input.nativeElement.value = 'peeskillet@stackoverflow.com';
      dispatchEvent(input.nativeElement);
      fixture.detectChanges();

      expect(control.hasError('notPeeskillet')).toBe(false);
      expect(form.control.valid).toEqual(true);
      expect(form.control.hasError('notPeeskillet', ['email'])).toEqual(false);
    });
  }));
});
