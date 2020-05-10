import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public h;
  public m;
  public status_chat = false;
  public z_index = 0;
  public email = '';
  public password = '';

  constructor(public authService: AuthService, public router: Router, private notifierService: NotifierService) {
    this.h = window.innerHeight;
    this.m = ((this.h) * ( 2 / 3)) + 'px';
    this.h += 'px';
    console.log(this.h);
  }

  ngOnInit() {

  }

  register() {
    if (this.email !== '' && this.password !== '') {
      this.router.navigate(['/register'] , { state: { email: this.email , password: this.password } });
    } else {
      this.notifierService.show({
        type : 'error',
        message: 'ادخل بيانات التسجيل',
      });
    }
  }

  show() {
    this.status_chat = !this.status_chat;
    if (this.status_chat) {
      this.z_index = 999999999999;
    } else {
      this.z_index = 0;
    }
  }

  getMessages() {
    
  }

}
