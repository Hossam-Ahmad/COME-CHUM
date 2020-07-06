import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/services/authUser.service';
import { UsersService } from 'src/services/users.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { SearchComponent } from '../search/search.component';

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
  public isAuthenticated = false;

  constructor(public translate: TranslateService,
              public router: Router,
              public auth: AuthUserService,
              private users: UsersService,
              private dialog: MatDialog,
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

}
