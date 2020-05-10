import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/authUser.service';
import { Router } from '@angular/router';
import { SocialService } from 'src/services/social.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public email = '';
  public password = '';
  public height;
  public loading = false;

  color = 'white';
  mode = 'indeterminate';

  constructor(
    public authService: AuthUserService,
    public router: Router,
    private social: SocialService,
    private notifierService: NotifierService) {
    this.height = window.innerHeight + 'px';
  }

  ngOnInit() {
  }

  loginTwitter() {
    this.social.loginTwitter().subscribe(data => {

      const d = new Date();
      d.setTime(d.getTime() +  24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `requestToken=${data['requestToken']}; ${expires}`;
      document.cookie = `requestTokenSecret=${data['requestTokenSecret']}; ${expires}`;
      window.location.href = `https://twitter.com/oauth/authenticate?oauth_token=${data['requestToken']}`;
    });
  }

  loginFB() {

  }

  loginInsta() {

  }

  login() {
    if (this.email !== '' && this.password !== '') {
      this.loading = true;
      this.authService.login(this.email, this.password).subscribe(result => {
        if (result['status'] === 'success') {
          this.loading = false;
          this.authService.setToken(result['token']);
          this.authService.setUserData(result);
          this.router.navigateByUrl('/feed');
        } else {
          this.loading = false;
          this.notifierService.show({
            type : 'error',
            message: 'هناك خطأ في البريد الالكتروني او كلمة المرور',
          });
        }
      });
    } else {
      this.notifierService.show({
        type : 'error',
        message: 'ادخل كل البيانات',
      });
    }
  }

  forget() {
    this.router.navigateByUrl('/cpanel/forget');
  }

}
