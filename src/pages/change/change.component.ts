import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  public oldEmail = '';
  public oldPassword = '';
  public newEmail = '';
  public newPassword = '';
  public height;

  constructor(public authService: AuthService, public router: Router) {
    this.height = window.scroll + 'px';
  }

  ngOnInit() {
  }

  update() {
    // let flag = 0;
    // if (this.oldEmail !== '' && this.oldPassword !== '' && this.newEmail !== '' && this.newPassword !== '') {
    //   this.authService.login().subscribe(result => {
    //     if (this.oldEmail === result[0]['admin_username'] && this.oldPassword === result[0]['admin_password']) {
    //       this.authService.changeCredentials(this.newEmail, this.newPassword);
    //       alert('تم التعديل بنجاح');
    //       this.router.navigateByUrl('/cpanel/login');
    //       flag = 1;
    //     } else {
    //       if (!flag) {
    //         alert('هناك خطأ في الايميل او كلمة المرور');
    //       }
    //     }
    //   });
    // } else {
    //   alert('ادخل كل البيانات');
    // }
  }

}
