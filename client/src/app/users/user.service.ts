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

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrl);
  }

  getUsersFiltered(filterRole?: UserRole, filterAge?: string, filterCompany?: string): Observable<User[]> {
    let httpParams: HttpParams = new HttpParams();
    if(filterRole) httpParams = httpParams.set("role", filterRole);
    if(filterAge) httpParams = httpParams.set("age", filterAge);
    if(filterCompany) httpParams = httpParams.set("company", filterCompany);
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

    // Filter by age
    if (searchCompany) {
      searchCompany = searchCompany.toLowerCase();

      filteredUsers = filteredUsers.filter(user => {
        return user.company.toLowerCase().indexOf(searchCompany) !== -1;
      });
    }

    return filteredUsers;
  }
}
