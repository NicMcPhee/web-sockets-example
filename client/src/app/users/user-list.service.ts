import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from "rxjs";

import {User} from './user';
import {environment} from "../../environments/environment";

@Injectable()
export class UserListService {
    private userUrl: string = environment.API_URL + "users";

    constructor(private httpClient: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        // return null;
        /*
        let observable: Observable<any> = this.httpClient.get(this.userUrl);
        return observable.map(res => res.json());
        */
        return this.httpClient.get<User[]>(this.userUrl);
    }

    getUserById(id: string): Observable<User> {
        // return null;
        return this.httpClient.get<User>(this.userUrl + "/" + id);
    }
}
