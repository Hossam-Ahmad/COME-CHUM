import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/services/feed.servie';
import { AuthUserService } from 'src/services/authUser.service';
import { TranslateService } from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { NewMessageComponent } from '../new-message/new-message.component';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @Input() blog;

  public comment_text = '';
  private page = 1;

  constructor(
    private feed: FeedService,
    private auth: AuthUserService,
    public translate: TranslateService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  comment() {
    this.auth.getData().subscribe(data => {
      this.feed.create_comment(this.blog.id, this.comment_text, data.id).subscribe( data2 => {
        this.blog.comments++;
        this.blog.comments_arr.push({
          user_id : data.profile_id,
          user_name : data.name,
          user_image : data.image,
          text : this.comment_text,
          online : 1,
          image : '',
          created_at : new Date().toISOString()
        });
        this.comment_text = '';
      });
    });
  }

  like() {
    this.auth.getData().subscribe(data => {
      if (this.blog.isliked) {
          this.feed.dislike(this.blog.id,  data.id).subscribe( data2 => {
            if (data2.status === 'success') {
              this.blog.likes--;
              this.blog.isliked = false;
            }
          });
      } else {
          this.feed.like(this.blog.id,  data.id).subscribe( data2 => {
            console.log(data2);
            if (data2.status === 'success') {
              this.blog.likes++;
              this.blog.isliked = true;
            }
          });
      }
    });
  }

  load_comments() {
    this.feed.load_comments(this.blog.id, this.page).subscribe( data => {
      console.log(data);
      this.page++;
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].comment_id === this.blog.comments_arr[0].comment_id) {
          data.results.splice(i, 1);
        }
      }
      this.blog.comments_arr = this.blog.comments_arr.concat(data.results);
      console.log(this.blog.comments_arr);
    });
  }

}
