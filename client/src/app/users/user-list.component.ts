import {Component, OnInit} from '@angular/core';
import {UserListService} from './user-list.service';
import {User} from './user';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user-list-component',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: []
})

export class UserListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public users: User[];
  public filteredUsers: User[];

  public userName: string;
  public userAge: number;


  // Inject the UserListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private userListService: UserListService) {

  }

  public updateName(newName: string): void {
    this.userName = newName;
    this.updateFilter();
  }

  public updateAge(newAge: number): void {
    this.userAge = newAge;
    this.updateFilter();
  }

  public updateFilter() {
    this.filteredUsers =
      this.userListService.filterUsers(
        this.users,
        this.userName,
        this.userAge);
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    const users: Observable<User[]> = this.userListService.getUsers();
    users.subscribe(
      returnedUsers => {
        this.users = returnedUsers;
      },
      err => {
        console.log(err);
      });
  }
}
