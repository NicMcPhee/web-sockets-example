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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to a specific user profile', () => {
    const expectedUser: User = MockUserService.testUsers[0];
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `UserProfileComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedUser._id });

    expect(component.id).toEqual(expectedUser._id);
    expect(component.user).toEqual(expectedUser);
  });

  it('should navigate to correct user when the id parameter changes', () => {
    let expectedUser: User = MockUserService.testUsers[0];
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `UserProfileComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedUser._id });

    expect(component.id).toEqual(expectedUser._id);

    // Changing the paramMap should update the displayed user profile.
    expectedUser = MockUserService.testUsers[1];
    activatedRoute.setParamMap({ id: expectedUser._id });

    expect(component.id).toEqual(expectedUser._id);
  });

  it('should have `null` for the user for a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });

    // If the given ID doesn't map to a user, we expect the service
    // to return `null`, so we would expect the component's user
    // to also be `null`.
    expect(component.id).toEqual('badID');
    expect(component.user).toBeNull();
  });
});
