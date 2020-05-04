import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-activate-website',
  templateUrl: './activate-website.component.html',
  styleUrls: ['./activate-website.component.scss']
})
export class ActivateWebsiteComponent implements OnInit {

  public email = '';
  public height;
  public loading = false;

  title = 'materialApp';
  color = 'white';
  mode = 'indeterminate';

  constructor(
    public authService: AuthService,
    public router: Router,
    private users: UsersService,
    private notifierService: NotifierService) {
      this.height = window.innerHeight + 'px';
  }

  ngOnInit() {
  }

  forget() {
    this.loading = true;
    this.users.forget(this.email).subscribe( data => {
      if (data['status'] === 'not found') {
        this.loading = false;
        this.showNotification('ليس هناك حساب مسجل بهذا البريد الالكتروني', 'error');
      } else {
        this.loading = false;
        this.showNotification('لقد تم ارسال رسالة علي بريدك الالكتروني', 'success');
      }
    });
  }

  showNotification(text, type) {
    this.notifierService.show({
      type,
      message: text,
    });
  }

}
