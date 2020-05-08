import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public email = '';
  public password = '';
  public height;
  public status_chat = false;

  constructor(public authService: AuthUserService, public router: Router) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
    this.authService.getData().subscribe( data => {
        console.log(data);
        this.authService.setUserData(data);
    });
  }

  show() {
    this.status_chat = !this.status_chat;
  }

}
