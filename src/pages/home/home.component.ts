import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthUserService } from 'src/services/authUser.service';
import { UsersService } from 'src/services/users.service';
import { ContactService } from 'src/services/contact.service';
import { Socket } from 'ngx-socket-io';
import { TranslateService } from '@ngx-translate/core';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy {

  public h;
  public m;
  public status_chat = false;
  public z_index = 0;
  public email = '';
  public password = '';
  public text = '';
  public messages = [];
  public eventIndex = 0;
  private page = 1;
  private userData;
  public homeData;

  constructor(
    public authService: AuthUserService,
    public router: Router,
    private notifierService: NotifierService,
    private users: UsersService,
    private contact: ContactService,
    private socket: Socket,
    public userService: UsersService,
    private contentService: ContentService,
    public translate: TranslateService) {
      this.fitScreen();
  }

  ngOnInit() {
    this.contentService.getHome().subscribe( data => {
      console.log(data);
      this.homeData = data;
    });
  }

  ngAfterViewInit() {
    this.identifyUser();
  }

  fitScreen() {
    if (window.innerWidth >= 800) {
      this.h = window.innerHeight;
    } else {
      this.h = 0.3 * window.innerHeight;
    }
    this.h += 'px';
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

  getNotifiedMessages() {
    this.socket.fromEvent(`sent${this.userData.contact_id}`).subscribe( data => {
      console.log(data);
      this.messages.push({
        data : data['data'],
        type : data['type'],
        sender : data['sender']
      });
    });
  }

  identifyUser() {
    const token = localStorage.getItem('tokenUnauthenticated');
    if (token == null) {
      console.log(token);
      const generatedToken = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('tokenUnauthenticated' , generatedToken);
      this.authService.createUnAuthentiated(generatedToken).subscribe(data => {
        console.log(data);
        this.userData = data[0];
        this.getNotifiedMessages();
      });
    } else {
      this.authService.getUnAuthentiated(token).subscribe( data => {
        console.log(data);
        if (data['length'] === 0) {
          const generatedToken = Math.random().toString(36).substr(2, 9);
          localStorage.setItem('tokenUnauthenticated' , generatedToken);
          this.authService.createUnAuthentiated(generatedToken).subscribe(data => {
            console.log(data);
            this.userData = data[0];
            this.getNotifiedMessages();
          });
        } else {
            this.userData = data[0];
            this.getNotifiedMessages();
            this.getMessages();
        }
      });
    }
  }

  getMessages() {
    this.users.getMessages(this.userData.id, this.page).subscribe( data => {
      this.messages = data;
      console.log(data);
    });
    this.page++;
  }

  ngOnDestroy() {
    this.socket.removeAllListeners();
  }

  send() {
    this.contact.send(this.text, 0, this.userData.contact_id, 0).subscribe( data => {
      this.text = '';
    });
  }

  nextEvent() {
    if (this.eventIndex < this.homeData.events.length - 1) {
      this.eventIndex++;
    }
  }

  prevEvent() {
    if (this.eventIndex > 0) {
      this.eventIndex--;
    }
  }

  search() {
    this.router.navigate(['/login']);
  }

}
