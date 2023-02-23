import { Component, OnInit, Input } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: User;
  @Input() simple ? = false;

  ngOnInit(): void {
    // do nothing, but the presence of this function makes other things work, skipqc: JS-0604
  }

}
