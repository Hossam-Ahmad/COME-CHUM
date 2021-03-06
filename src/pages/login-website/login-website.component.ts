import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/authUser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialService } from 'src/services/social.service';
import { NotifierService } from 'angular-notifier';
import { UsersService } from 'src/services/users.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { TranslateService } from '@ngx-translate/core';

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
    private socialAuthService: AuthService,
    private route: ActivatedRoute,
    public translate: TranslateService
    ) {
    this.height = window.innerHeight + 'px';
    this.route.queryParams.subscribe(params => {
      if (params['status'] === 'failed') {
        this.notifierService.show({
          type : 'error',
          message: this.translate.instant('no_account_attached'),
        });
      } else if (params['status'] === 'success') {
        this.authService.setToken(params['token']);
        this.authService.setUserData({
          token : params['token'],
          name : params['name'],
          id : params['id'],
          image : params['image'],
          email : params['email'],
          cover : params['cover'],
          about : params['about'],
          profile_id : params['profile_id']
        });
        this.router.navigateByUrl('/feed');
      }
    });
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
      document.cookie = `source_link_twitter=/login; ${expires}`;
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
                message: this.translate.instant('no_account_attached'),
              });
          }
        });
      }
    );
  }

  signInWithFB(): void {

    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.social.loginFb(userData.id).subscribe( data => {
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
                message: this.translate.instant('no_account_attached'),
              });
          }
        });
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
          result['package_expired'] = false;
          this.authService.setUserData(result);
          this.router.navigateByUrl('/feed');
        } else if (result['status'] === 'failed') {
          this.loading = false;
          this.notifierService.show({
            type : 'error',
            message: 'هناك خطأ في البريد الالكتروني او كلمة المرور',
          });
        } else if (result['status'] === 'not_activated') {
          this.loading = false;
          this.router.navigateByUrl('/activate');
        } else if (result['status'] === 'package_expired') {
          this.loading = false;
          result['package_expired'] = true;
          this.authService.setToken(result['token']);
          this.authService.setUserData(result);
          this.router.navigateByUrl('/packages?error=1');
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

  isMobile() {
    if (window.screen.width > 991) {
      return false;
    }
    return true;
  }

}
