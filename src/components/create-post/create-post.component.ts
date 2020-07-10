import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FeedService } from 'src/services/feed.servie';
import { NotifierService } from 'angular-notifier';
import { AuthUserService } from 'src/services/authUser.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreatePostOptionsComponent } from '../create-post-options/create-post-options.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @Output() postAdded = new EventEmitter<boolean>();

  post_data = {
    user_id : '',
    body : '',
    images : {},
    videos : {}
  };
  userImage = '';

  constructor(
    public translate: TranslateService,
    private feed: FeedService,
    private notifierService: NotifierService,
    private auth: AuthUserService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.auth.getData().subscribe(data => {
      this.post_data.user_id = data.id;
      this.userImage = data.image;
    });
  }

  upload_image() {
    document.getElementById('upload_image').click();
  }

  upload_video() {
    document.getElementById('upload_video').click();
  }

  send() {
    if (this.post_data.body !== '') {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        post_data: this.post_data
      };
      dialogConfig.disableClose = false;
      dialogConfig.panelClass = 'colorize-background';
      const dialogRef = this.dialog.open(CreatePostOptionsComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(data => {
        console.log(data);
        this.postAdded.emit(data);
        // this.post_data.body = '';
      });
    }
  }

  onImageChanged(event) {
    const file = event.target.files[0];
  }

  onVideoChanged(event) {
    const file = event.target.files[0];
  }

}
