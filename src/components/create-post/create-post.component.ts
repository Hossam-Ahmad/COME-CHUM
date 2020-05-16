import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FeedService } from 'src/services/feed.servie';
import { NotifierService } from 'angular-notifier';
import { AuthUserService } from 'src/services/authUser.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  post_data = {
    user_id : '',
    body : '',
    images : {},
    videos : {}
  };

  constructor(
    public translate: TranslateService,
    private feed: FeedService,
    private notifierService: NotifierService,
    private auth: AuthUserService) {
  }

  ngOnInit(): void {
    this.auth.getData().subscribe(data => {
      this.post_data.user_id = data.id;
    });
  }

  upload_image() {
    document.getElementById('upload_image').click();
  }

  upload_video() {
    document.getElementById('upload_video').click();
  }

  send() {
    this.feed.create(this.post_data).subscribe( data => {
      console.log(data);
      this.post_data.body = '';
      this.post_data.images = {};
      this.post_data.videos = {};
      this.notifierService.show({
        type : 'success',
        message: 'تم نشر المنشور بنجاح',
      });
    });
  }

  onImageChanged(event) {
    const file = event.target.files[0];
  }

  onVideoChanged(event) {
    const file = event.target.files[0];
  }

}
