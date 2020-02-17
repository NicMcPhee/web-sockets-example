import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserCardComponent } from './user-card.component';
import { of, Observable } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';
import { MatCardModule } from '@angular/material/card';
import { MockUserService } from './user.service.mock';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [ UserProfileComponent, UserCardComponent ],
      providers: [{provide: UserService, useValue: new MockUserService()}]
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
