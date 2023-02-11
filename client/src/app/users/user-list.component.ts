import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, UserRole } from './user';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list-component',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: []
})

export class UserListComponent implements OnInit, OnDestroy  {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredUsers: User[];
  public filteredUsers: User[];

  public userName: string;
  public userAge: number;
  public userRole: UserRole;
  public userCompany: string;
  public viewType: 'card' | 'list' = 'card';
  getUsersSubscription: Subscription;


  // Inject the UserService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private userService: UserService) {

  }

  getUsersFromServer(): void {
    this.unsubscribeConditionally();
    // A user-list-component has a getUsersSubscription (which is a subscription)
    // that is paying attention to userService.getUsers (which is an Observable<User[]>)
    // (for more on Observable, see: https://reactivex.io/documentation/observable.html)
    // and we are specifically watching for role and age whenever the User[] gets updated
    this.getUsersSubscription = this.userService.getUsers({
      role: this.userRole,
      age: this.userAge
    })
    .subscribe({
      // Next time we see a change in the Observable<User[]>,
      // refer to that User[] as returnedUsers here and do the steps in the {}
      next: (returnedUsers) => {
        // First, update the array of serverFilteredUsers
        this.serverFilteredUsers = returnedUsers;
        // Then update the filters for our client-side filtering as described in this method
        this.updateFilter();
      },
      // If we observe an error in that Observable, put it in the console so we can learn more
      error: (e) => console.error(e),
      // Once the observable has completed successfully
      complete: () => console.log('Users were filtered on the server') //this WAS console.info, but that wasn't allowed here
    });
  }

  public updateFilter(): void {
    this.filteredUsers = this.userService.filterUsers(
      this.serverFilteredUsers, { name: this.userName, company: this.userCompany });
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    this.getUsersFromServer();
  }

  ngOnDestroy(): void {
    // When we destroy the user-list-component, unsubscribe from that Observable<User[]>
    // This unsubscribing action allows the Observable to stop emitting events
    // if we were the only ones paying attention (if all of the followers stop following, no need to tell us)
    this.unsubscribeConditionally();
  }

  unsubscribeConditionally(): void {
    if (this.getUsersSubscription) {
      this.getUsersSubscription.unsubscribe();
    }
  }

}
