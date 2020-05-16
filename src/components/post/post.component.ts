import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/services/feed.servie';
import { AuthUserService } from 'src/services/authUser.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post;

  public comment_text = '';

  constructor(
    private feed: FeedService,
    private auth: AuthUserService) {
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

}
