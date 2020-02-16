import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';

import {User} from './user';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  readonly userUrl: string = environment.API_URL + 'users';

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl);
  }

  getUsersFiltered(filterAge?: string, filterCompany?: string): Observable<User[]> {
    let httpParams: HttpParams = new HttpParams();
    if(filterAge) httpParams = httpParams.set("age", filterAge);
    if(filterCompany) httpParams = httpParams.set("company", filterCompany);
    return this.httpClient.get<User[]>(this.userUrl, {
      params: httpParams,
    });
  }

  // This is an example of searching by age on the server using the server API
  getUsersByAge(searchAge: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl + '?age=' + searchAge);
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + '/' + id);
  }

  filterUsers(users: User[], searchName?: string, searchAge?: number): User[] {

    let filteredUsers = users;

    // Filter by name
    if (searchName != null) {
      searchName = searchName.toLowerCase();

      filteredUsers = filteredUsers.filter(user => {
        return !searchName || user.name.toLowerCase().indexOf(searchName) !== -1;
      });
    }

    // Filter by age
    if (searchAge != null) {
      filteredUsers = filteredUsers.filter((user: User) => {
        return !searchAge || (user.age === Number(searchAge));
      });
    }

    return filteredUsers;
  }
}
