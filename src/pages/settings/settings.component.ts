import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/authUser.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UsersService } from 'src/services/users.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public activeId = 0;
  public country = '';
  public city = '';
  public gender = '';
  public phone = '';
  public postal = '';
  public name = '';
  public email = '';
  public mode = 'indeterminate';
  public loading = false;
  public color = 'white';

  public userData = undefined;

  constructor(
    public authService: AuthUserService,
    public router: Router,
    private notifierService: NotifierService,
    private users: UsersService,
    public translate: TranslateService) {
  }

  ngOnInit() {
    this.getGeneralData();
  }

  changeTab(id) {
    this.activeId = id;
  }

  select() {
    document.getElementById('upload').click();
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }

  getGeneralData() {
    this.authService.getData().subscribe( data => {
      this.userData = data;
      console.log(this.userData);
      this.name = this.userData.name;
    });
  }

  update() {
    if (this.userData.name !== '') {
      this.users.update(this.authService.getToken(), this.userData).subscribe( data => {
        this.notifierService.show({
          type : 'success',
          message: 'لقم تم تعديل بيانات الحساب',
        });
      });
    } else {
      this.notifierService.show({
        type : 'error',
        message: 'ادخل بيانات الحساب كامله',
      });
    }
  }

}
