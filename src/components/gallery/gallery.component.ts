import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from 'src/services/events.service';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() type;
  @Input() event;

  private pageImages = 1;
  private pageVideos = 1;
  public images = [];
  public videos = [];

  constructor(
    public translate: TranslateService,
    private eventsService: EventsService) {
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
    this.eventsService.load_images(this.event.id, this.pageImages).subscribe( data => {
      this.images = this.images.concat(data as Array<any>);
      console.log(this.images);
      this.pageImages++;
    });
  }

  getVideos() {
    this.eventsService.load_videos(this.event.id, this.pageVideos).subscribe( data => {
      this.videos = this.videos.concat(data as Array<any>);
      console.log(this.videos);
      this.pageVideos++;
    });
  }

}
