import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-list-component',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: []
})

export class UserListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public serverFilteredUsers: User[];
  public filteredUsers: User[];

  public userName: string;
  public userAge: number;
  public userAgeForServerFilter: string;


  // Inject the UserService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private userService: UserService) {

  }

  // This shows what happens when the server filter age is updated
  public updateServerFilterAge(newAge: string): void{
    let users: Observable<User[]>;
    if (newAge != '') {
      this.userAgeForServerFilter = newAge;
      users = this.userService.getUsersByAge(this.userAgeForServerFilter);
      users.subscribe(
        returnedUsers => {
          this.serverFilteredUsers = returnedUsers;
          this.updateFilter();
        },
        err => {
          console.log(err);
        });
    } else {
      users = this.userService.getUsers();
      users.subscribe(
        returnedUsers => {
          this.serverFilteredUsers = returnedUsers;
          this.updateFilter();
        },
        err => {
          console.log(err);
        });
    }
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
      this.userService.filterUsers(
        this.serverFilteredUsers,
        this.userName,
        this.userAge);
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  ngOnInit(): void {
    const users: Observable<User[]> = this.userService.getUsers();
    users.subscribe(
      returnedUsers => {
        this.serverFilteredUsers = returnedUsers;
        this.filteredUsers = returnedUsers;
      },
      err => {
        console.log(err);
      });
  }
}
