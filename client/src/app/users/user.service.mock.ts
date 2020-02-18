import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserRole } from './user';
import { UserService } from './user.service';

@Injectable()
export class MockUserService extends UserService {
  testUsers: User[] = [
    {
      _id: 'chris_id',
      name: 'Chris',
      age: 25,
      company: 'UMM',
      email: 'chris@this.that',
      role: 'admin',
      avatar: 'https://gravatar.com/avatar/8c9616d6cc5de638ea6920fb5d65fc6c?d=identicon'
    },
    {
      _id: 'pat_id',
      name: 'Pat',
      age: 37,
      company: 'IBM',
      email: 'pat@something.com',
      role: 'editor',
      avatar: 'https://gravatar.com/avatar/b42a11826c3bde672bce7e06ad729d44?d=identicon'
    },
    {
      _id: 'jamie_id',
      name: 'Jamie',
      age: 37,
      company: 'Frogs, Inc.',
      email: 'jamie@frogs.com',
      role: 'viewer',
      avatar: 'https://gravatar.com/avatar/d4a6c71dd9470ad4cf58f78c100258bf?d=identicon'
    }
  ];

  constructor() {
    super(null);
  }


  getUsers(filters: { role?: UserRole, age?: number, company?: string }): Observable<User[]> {
    return of(this.testUsers); // Just return the test users regardless of what filters are passed in
  }

  getUserById(id: string): Observable<User> {
    return of(this.testUsers[0]);
  }

}
