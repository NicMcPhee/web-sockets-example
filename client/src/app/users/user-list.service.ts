import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {User} from './user';
import {environment} from '../../environments/environment';

@Injectable()
export class UserListService {
    readonly userUrl: string = environment.API_URL + 'users';

    constructor(private httpClient: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.userUrl);
    }

    getUserById(id: string): Observable<User> {
        return this.httpClient.get<User>(this.userUrl + '/' + id);
    }
}
