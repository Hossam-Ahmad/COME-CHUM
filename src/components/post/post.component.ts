import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/services/feed.servie';
import { AuthUserService } from 'src/services/authUser.service';
import { TranslateService } from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { NewMessageComponent } from '../new-message/new-message.component';
import { MiscService } from 'src/services/misc.service';
import { LocationsService } from 'src/services/locations.service';
import { EventsService } from 'src/services/events.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post;
  @Input() EntryData;

  public comment_text = '';
  private page = 1;
  public user_id;

  public imagesUrl = [
    'https://www.hello.com/img_/hellowithwaves.png',
    'https://www.hello.com/img_/hellowithwaves.png',
    'https://www.hello.com/img_/hellowithwaves.png'
  ];

  constructor(
    private feed: FeedService,
    private auth: AuthUserService,
    public translate: TranslateService,
    private dialog: MatDialog,
    public misc: MiscService,
    public locationsService: LocationsService,
    private eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.post.body = unescape(this.post.body);
    this.auth.getData().subscribe(data => {
      this.user_id = data.id;
    });
  }

  upload_image() {
    document.getElementById('upload_image').click();
  }

  comment() {
    this.auth.getData().subscribe(data => {
      if (this.EntryData && this.EntryData.type === 'event') {
        this.eventsService.create_comment(this.EntryData.id, this.post.id, this.comment_text, data.id).subscribe( data2 => {
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
      } else if (this.EntryData && this.EntryData.type === 'group') {

      } else if (this.EntryData && this.EntryData.type === 'blog') {

      } else {
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
      }
    });
  }

  like() {
    this.auth.getData().subscribe(data => {
      if (this.post.isliked) {
        if (this.EntryData && this.EntryData.type === 'event') {
          this.eventsService.dislike(this.EntryData.id, this.post.id,  data.id).subscribe( data2 => {
            if (data2.status === 'success') {
              this.post.likes--;
              this.post.isliked = false;
            }
          });
        } else if (this.EntryData && this.EntryData.type === 'group') {

        } else if (this.EntryData && this.EntryData.type === 'blog') {

        } else {
          this.feed.dislike(this.post.id,  data.id).subscribe( data2 => {
            if (data2.status === 'success') {
              this.post.likes--;
              this.post.isliked = false;
            }
          });
        }
      } else {
        if (this.EntryData && this.EntryData.type === 'event') {
          this.eventsService.like(this.EntryData.id, this.post.id,  data.id).subscribe( data2 => {
            if (data2.status === 'success') {
              this.post.likes++;
              this.post.isliked = true;
            }
          });
        } else if (this.EntryData && this.EntryData.type === 'group') {

        } else if (this.EntryData && this.EntryData.type === 'blog') {

        } else {
          this.feed.like(this.post.id,  data.id).subscribe( data2 => {
            console.log(data2);
            if (data2.status === 'success') {
              this.post.likes++;
              this.post.isliked = true;
            }
          });
        }
      }
    });
  }

  onImageChanged(event) {
    const file = event.target.files[0];
  }

  load_comments() {
    if (this.EntryData && this.EntryData.type === 'event') {
      this.eventsService.load_comments(this.EntryData.id, this.post.id, this.page).subscribe( data => {
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
    } else if (this.EntryData && this.EntryData.type === 'group') {

    } else if (this.EntryData && this.EntryData.type === 'blog') {

    } else {
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

  getPaths(images) {
    let paths = [];
    images.forEach(img => {
      paths.push(img.path);
    });
    return paths;
  }

  isMobile() {
    if (window.screen.width > 991) {
      return false;
    }
    return true;
  }

}
