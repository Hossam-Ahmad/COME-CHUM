import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from 'src/services/events.service';
import { GroupsService } from 'src/services/groups.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() type;
  @Input() data;

  private pageImages = 1;
  private pageVideos = 1;
  public images = [];
  public videos = [];

  constructor(
    public translate: TranslateService,
    private eventsService: EventsService,
    private groupService: GroupsService) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (this.type === 'images') {
      this.getImages();
    } else {
      this.getVideos();
    }
  }

  getImages() {
    let request;
    if (this.data.type === 'event') {
      request = this.eventsService.load_images(this.data.id, this.pageImages);
    } else if (this.data.type === 'group') {
      request = this.groupService.load_images(this.data.id, this.pageImages);
    }
    request.subscribe( data => {
      this.images = this.images.concat(data as Array<any>);
      console.log(this.images);
      this.pageImages++;
    });
  }

  getVideos() {
    let request;
    if (this.data.type === 'event') {
      request = this.eventsService.load_videos(this.data.id, this.pageVideos);
    } else if (this.data.type === 'group') {
      request = this.groupService.load_videos(this.data.id, this.pageVideos);
    }
    request.subscribe( data => {
      this.videos = this.videos.concat(data as Array<any>);
      console.log(this.videos);
      this.pageVideos++;
    });
  }

}
