import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserCardComponent } from './user-card.component';
import { of, Observable } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';
import { MatCardModule } from '@angular/material/card';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  let userServiceStub: {
    getUser: (id: string) => Observable<User>
  };

  beforeEach(async(() => {

    userServiceStub = {
      getUser: (id: string) => of({
        _id: 'chris_id',
        name: 'Chris',
        age: 25,
        company: 'UMM',
        email: 'chris@this.that',
        avatar: 'https://gravatar.com/avatar/8c9616d6cc5de638ea6920fb5d65fc6c?d=identicon'
      })
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [ UserProfileComponent, UserCardComponent ],
      providers: [{provide: UserService, useValue: userServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
