import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';
  public height;

  constructor(public authService: AuthService, public router: Router) {
    this.height = window.outerHeight + 'px';
  }

  ngOnInit() {
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

  isMobile() {
    if (window.screen.width > 991) {
      return false;
    }
    return true;
  }

}
