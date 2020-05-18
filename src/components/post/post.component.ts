import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/services/feed.servie';
import { AuthUserService } from 'src/services/authUser.service';
import { TranslateService } from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { NewMessageComponent } from '../new-message/new-message.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post;

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

  upload_image() {
    document.getElementById('upload_image').click();
  }

  comment() {
    this.auth.getData().subscribe(data => {
      this.feed.create_comment(this.post.id, this.comment_text, data.id).subscribe( data2 => {
        this.post.comments++;
        this.post.comments_arr.push({
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
      if (this.post.isliked) {
          this.feed.dislike(this.post.id,  data.id).subscribe( data2 => {
            if (data2.status === 'success') {
              this.post.likes--;
              this.post.isliked = false;
            }
          });
      } else {
          this.feed.like(this.post.id,  data.id).subscribe( data2 => {
            console.log(data2);
            if (data2.status === 'success') {
              this.post.likes++;
              this.post.isliked = true;
            }
          });
      }
    });
  }

  onImageChanged(event) {
    const file = event.target.files[0];
  }

  load_comments() {
    this.feed.load_comments(this.post.id, this.page).subscribe( data => {
      console.log(data);
      this.page++;
      for (let i = 0; i < data.results.length; i++) {
        if (data.results[i].comment_id === this.post.comments_arr[0].comment_id) {
          data.results.splice(i, 1);
        }
      }
      this.post.comments_arr = this.post.comments_arr.concat(data.results);
      console.log(this.post.comments_arr);
    });
  }

  chat() {
    this.auth.getData().subscribe(data => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        other_id: this.post.user_id,
        other_name : this.post.name,
        image : this.post.image,
        id: data.id
      };
      dialogConfig.panelClass = 'colorize-background';
      this.dialog.open(NewMessageComponent, dialogConfig);
    });
  }

}