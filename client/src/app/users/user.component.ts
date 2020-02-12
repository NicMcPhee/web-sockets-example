import {Component, Input} from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-user-component',
  styleUrls: ['./user.component.css'],
  templateUrl: 'user.component.html'
})
export class UserComponent {

  @Input() user: User;

  constructor() { }
}
