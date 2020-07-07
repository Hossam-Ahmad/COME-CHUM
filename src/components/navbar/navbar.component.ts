import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';
import { UsersService } from 'src/services/users.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { SearchComponent } from '../search/search.component';
import { NotificationsService } from 'src/services/notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  status = '/';
  language = '';
  public userName = '';
  public userImage = '';
  public userId = '';
  public id = 0;
  public isAuthenticated = false;
  public notifications = [];
  private pageId = 1;
  public icons = [
    '../../../assets/images/chat.svg',
    '../../../assets/images/heart.svg',
    '../../../assets/images/comments.svg',
    '../../../assets/images/star.svg',
    '../../../assets/images/card.svg',
    '../../../assets/images/calendar.svg',
  ];
  public text = '';

  constructor(public translate: TranslateService,
              public router: Router,
              public auth: AuthUserService,
              private users: UsersService,
              private dialog: MatDialog,
              private notificationsService: NotificationsService
              ) {
               }

  ngOnInit() {
    this.status = this.router.url;
    this.language = localStorage.getItem('language');
    if (this.auth.isAuthenticated()) {
      this.getUserData();
      this.isAuthenticated = true;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getUserData() {
    this.auth.getData().subscribe( data => {
      this.userName = data.name;
      this.userImage = data.image;
      this.userId = data.profile_id;
      this.id = data.id;
      this.getNotifications();
    });
  }

  changeLang() {
    this.users.switchLanguage();
  }

  isMobile() {
    if (window.screen.width > 991) {
      return false;
    }
    return true;
  }

  search(text) {
    this.router.navigate(['result'], { queryParams: { text } });
  }

  advancedSearch() {
    if (!this.isMobile()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          id: this.userId
      };
      dialogConfig.panelClass = 'colorize-background';
      this.dialog.open(SearchComponent, dialogConfig);
    } else {
      this.router.navigate(['search']);
    }
  }

  getNotifications() {
    this.notificationsService.getAll(this.id, this.pageId).subscribe( data => {
      this.notifications = this.notifications.concat(data);
      this.pageId++;
      console.log(this.notifications);
    });
}

}
