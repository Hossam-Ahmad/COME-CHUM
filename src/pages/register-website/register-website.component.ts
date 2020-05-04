import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SocialService } from 'src/services/social.service';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-register-website',
  templateUrl: './register-website.component.html',
  styleUrls: ['./register-website.component.scss']
})
export class RegisterWebsiteComponent implements OnInit {

  public email = '';
  public name = '';
  public password = '';
  public repassword = '';
  public gender = '';
  public country = '';
  public height;
  public loading = false;

  color = 'white';
  mode = 'indeterminate';

  constructor(
    public authService: AuthService,
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
      this.authService.loginUser(this.email, this.password).subscribe(result => {
        if (result['status'] === 'success') {
          this.loading = false;
          this.authService.setToken(result['token']);
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
