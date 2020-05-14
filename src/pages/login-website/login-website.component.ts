import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/authUser.service';
import { Router } from '@angular/router';
import { SocialService } from 'src/services/social.service';
import { NotifierService } from 'angular-notifier';
import { UsersService } from 'src/services/users.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-login-website',
  templateUrl: './login-website.component.html',
  styleUrls: ['./login-website.component.scss']
})
export class LoginWebsiteComponent implements OnInit {

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
    private notifierService: NotifierService,
    private users: UsersService,
    private socialAuthService: AuthService
    ) {
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

  signInWithGoogle(): void {

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log('google sign in data : ' , userData);
        this.social.loginGoogle(userData.id).subscribe( data => {
          console.log(data);
          if (data['status'] === 'success') {
              this.loading = false;
              this.authService.setToken(data['token']);
              this.authService.setUserData(data);
              this.router.navigateByUrl('/feed');
          } else {
              this.loading = false;
              this.notifierService.show({
                type : 'error',
                message: 'ليس هناك حساب مربوط بهذه البيانات',
              });
          }
        });
      }
    );
  }

  signInWithFB(): void {
    this.social.loginFb().subscribe( data => {
      console.log(data);
      if (data['status'] === 'success') {
          this.loading = false;
          this.authService.setToken(data['token']);
          this.authService.setUserData(data);
          this.router.navigateByUrl('/feed');
      } else {
          this.loading = false;
          this.notifierService.show({
            type : 'error',
            message: 'ليس هناك حساب مربوط بهذه البيانات',
          });
      }
    });
  }

  login() {
    if (this.email !== '' && this.password !== '') {
      this.loading = true;
      this.authService.login(this.email, this.password).subscribe(result => {
        console.log(result);
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
