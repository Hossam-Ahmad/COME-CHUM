import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthUserService } from 'src/services/authUser.service';
import { UsersService } from 'src/services/users.service';
import { ContactService } from 'src/services/contact.service';
import { Socket } from 'ngx-socket-io';

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
  public text = '';
  public messages = [];
  private page = 1;
  private userData;

  constructor(
    public authService: AuthUserService,
    public router: Router,
    private notifierService: NotifierService,
    private users: UsersService,
    private contact: ContactService,
    private socket: Socket) {
    this.h = window.innerHeight;
    this.m = ((this.h) * ( 2 / 3)) + 'px';
    this.h += 'px';
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.identifyUser();
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

  identifyUser() {
    const token = localStorage.getItem('tokenUnauthenticated');
    this.authService.getUnAuthentiated(token).subscribe( data => {
      console.log(data);
      if (data['length'] === 0) {
        if (token != null) {
          const generatedToken = Math.random().toString(36).substr(2, 9);
          localStorage.setItem('tokenUnauthenticated' , generatedToken);
        }
        this.authService.createUnAuthentiated(token).subscribe(data => {
          console.log(data);
          this.userData = data[0];
        });
      } else {
          this.userData = data[0];
          this.getMessages();
      }
    });
  }

  getMessages() {
    this.users.getMessages(this.userData.id, this.page).subscribe( data => {
      this.messages = data;
      console.log(data);
    });
    this.socket.fromEvent('sent').subscribe( data => {
      console.log(data);
      this.messages.push({
        data : data['data'],
        type : data['type'],
        sender : data['sender']
      });
    });
    this.page++;
  }

  send() {
    this.contact.send(this.text, 0, this.userData.contact_id, 0).subscribe( data => {
      this.text = '';
    });
  }

}
