import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import {FormsModule} from '@angular/forms';


import {User} from './user';
import {UserListComponent} from './user-list.component';
import {UserService} from './user.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserComponent } from './user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  BrowserAnimationsModule,
];

describe('User list', () => {

  let userList: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  let userServiceStub: {
    getUsers: () => Observable<User[]>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    userServiceStub = {
      getUsers: () => of([
        {
          id: 'chris_id',
          name: 'Chris',
          age: 25,
          company: 'UMM',
          email: 'chris@this.that'
        },
        {
          id: 'pat_id',
          name: 'Pat',
          age: 37,
          company: 'IBM',
          email: 'pat@something.com'
        },
        {
          id: 'jamie_id',
          name: 'Jamie',
          age: 37,
          company: 'Frogs, Inc.',
          email: 'jamie@frogs.com'
        }
      ])
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [UserListComponent, UserComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: UserService, useValue: userServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(UserListComponent);
      userList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('contains all the users', () => {
    expect(userList.serverFilteredUsers.length).toBe(3);
  });

  it('contains a user named \'Chris\'', () => {
    expect(userList.serverFilteredUsers.some((user: User) => user.name === 'Chris')).toBe(true);
  });

  it('contain a user named \'Jamie\'', () => {
    expect(userList.serverFilteredUsers.some((user: User) => user.name === 'Jamie')).toBe(true);
  });

  it('doesn\'t contain a user named \'Santa\'', () => {
    expect(userList.serverFilteredUsers.some((user: User) => user.name === 'Santa')).toBe(false);
  });

  it('has two users that are 37 years old', () => {
    expect(userList.serverFilteredUsers.filter((user: User) => user.age === 37).length).toBe(2);
  });
});

describe('Misbehaving User List', () => {
  let userList: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  let userServiceStub: {
    getUsers: () => Observable<User[]>
  };

  beforeEach(() => {
    // stub UserService for test purposes
    userServiceStub = {
      getUsers: () => Observable.create(observer => {
        observer.error('Error-prone observable');
      })
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [UserListComponent, UserComponent],
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [{provide: UserService, useValue: userServiceStub}]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(UserListComponent);
      userList = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('generates an error if we don\'t set up a UserListService', () => {
    // Since the observer throws an error, we don't expect users to be defined.
    expect(userList.serverFilteredUsers).toBeUndefined();
  });
});
