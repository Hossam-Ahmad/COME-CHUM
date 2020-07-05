import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { AuthUserService } from '../../services/authUser.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'src/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationComponent implements OnInit {

  public notifications = [];
  public icons = [
    '../../../assets/images/chat.svg',
    '../../../assets/images/heart.svg',
    '../../../assets/images/comments.svg',
    '../../../assets/images/star.svg',
    '../../../assets/images/card.svg',
    '../../../assets/images/calendar.svg',
  ];
  private pageId = 1;
  public userId;

  constructor(
    private authService: AuthUserService,
    private router: Router,
    private notificationsService: NotificationsService,
    public translate: TranslateService) {
  }

  ngOnInit() {
    this.authService.getData().subscribe( data => {
      this.userId = data.id;
      this.getNotifications();
    });
  }

  getNotifications() {
      this.notificationsService.getAll(this.userId, this.pageId).subscribe( data => {
        this.notifications = this.notifications.concat(data);
        this.pageId++;
        console.log(data);
      });
  }

  isMobile() {
    if (window.screen.width > 991) {
      return false;
    }
    return true;
  }

  select(index) {

  }

}
