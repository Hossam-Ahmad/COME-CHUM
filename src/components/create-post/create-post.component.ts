import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FeedService } from 'src/services/feed.servie';
import { NotifierService } from 'angular-notifier';
import { AuthUserService } from 'src/services/authUser.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreatePostOptionsComponent } from '../create-post-options/create-post-options.component';
import { EventsService } from 'src/services/events.service';
import { GroupsService } from 'src/services/groups.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @Output() postAdded = new EventEmitter<any>();
  @Input() EntryData;

  post_data = {
    user_id : '',
    event_id : '',
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
    private dialog: MatDialog,
    private eventService: EventsService,
    private groupService: GroupsService) {
  }

  ngOnInit(): void {
    this.auth.getData().subscribe(data => {
      this.post_data.user_id = data.id;
      this.post_data.event_id = this.EntryData.id;
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
      if (this.EntryData && this.EntryData.type === 'event') {
        this.eventService.createPost(this.post_data).subscribe( data => {
          this.postAdded.emit(JSON.parse(JSON.stringify(this.post_data)));
          this.post_data.body = '';
        });
        // this.EntryData.id
      } else if (this.EntryData && this.EntryData.type === 'group') {
        // this.EntryData.id
      } else {
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
          this.postAdded.emit(JSON.parse(JSON.stringify(data)));
          this.post_data.body = '';
        });
      }
    }
  }

  onImageChanged(event) {
    const file = event.target.files[0];
  }

  onVideoChanged(event) {
    const file = event.target.files[0];
  }

}
