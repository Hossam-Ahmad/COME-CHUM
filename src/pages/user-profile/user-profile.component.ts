import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId;
  public userData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.userId = params['userId'];
        this.usersService.get(this.userId).subscribe( data => {
          this.userData = data[0];
          console.log(this.userData);
        });
      });
  }

  open() {
    const win = window.open(`${environment.host}profile/${this.userData.profile_id}`, '_blank');
    win.focus();
  }

}
