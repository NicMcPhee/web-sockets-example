import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';

import {User, UserRole} from './user';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
  readonly userUrl: string = environment.API_URL + 'users';

  constructor(private httpClient: HttpClient) {
  }

  getUsers(filters?: {role?: UserRole, age?: string, company?: string}): Observable<User[]> {
    let httpParams: HttpParams = new HttpParams();
    if(filters) {
      if(filters.role) httpParams = httpParams.set("role", filters.role);
      if(filters.age) httpParams = httpParams.set("age", filters.age);
      if(filters.company) httpParams = httpParams.set("company", filters.company);
    }
    return this.httpClient.get<User[]>(this.userUrl, {
      params: httpParams,
    });
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(this.userUrl + '/' + id);
  }

  filterUsers(users: User[], searchName?: string, searchCompany?: string): User[] {

    let filteredUsers = users;

    // Filter by name
    if (searchName) {
      searchName = searchName.toLowerCase();

      filteredUsers = filteredUsers.filter(user => {
        return user.name.toLowerCase().indexOf(searchName) !== -1;
      });
    }

    // Filter by company
    if (searchCompany) {
      searchCompany = searchCompany.toLowerCase();

      filteredUsers = filteredUsers.filter(user => {
        return user.company.toLowerCase().indexOf(searchCompany) !== -1;
      });
    }

    return filteredUsers;
  }
}
