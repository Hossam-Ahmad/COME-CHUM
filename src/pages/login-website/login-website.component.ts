import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SocialService } from 'src/services/social.service';



@Component({
  selector: 'app-login-website',
  templateUrl: './login-website.component.html',
  styleUrls: ['./login-website.component.scss']
})
export class LoginWebsiteComponent implements OnInit {

  public email = '';
  public password = '';
  public height;

  constructor(public authService: AuthService, public router: Router, private social: SocialService) {
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
      this.authService.login(this.email, this.password).subscribe(result => {
        if (result['status'] === 'success') {
          this.authService.setToken(result['token']);
          this.router.navigateByUrl('/cpanel/dashboard');
        } else {
          alert('هناك خطأ في الايميل او كلمة المرور');
        }
      });
    } else {
      alert('ادخل كل البيانات');
    }
  }

  change() {
    this.router.navigateByUrl('/cpanel/change');
  }

  forget() {
    this.router.navigateByUrl('/cpanel/forget');
  }

}
