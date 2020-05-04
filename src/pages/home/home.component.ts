import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public email = '';
  public password = '';
  public height;
  public status_chat = false;

  constructor(public authService: AuthService, public router: Router) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {

  }

  show() {
    this.status_chat = !this.status_chat;
  }

}
