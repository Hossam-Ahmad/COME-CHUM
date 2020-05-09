import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public h;
  public m;
  public status_chat = false;

  constructor(public authService: AuthService, public router: Router) {
    this.h = window.innerHeight;
    this.m = ((this.h) * ( 2 / 3)) + 'px';
    this.h += 'px';
    console.log(this.h);
  }

  ngOnInit() {

  }

  show() {
    this.status_chat = !this.status_chat;
  }

}
