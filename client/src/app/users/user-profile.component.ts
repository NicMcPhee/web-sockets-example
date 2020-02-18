import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  user: User;

  ngOnInit(): void {
    this.route.paramMap.subscribe((pmap) => {
      this.userService.getUserById(pmap.get('id')).subscribe(user => this.user = user);
    });
  }

}
