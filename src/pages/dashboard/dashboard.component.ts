import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public hasPage = false;
  public title_Ar = '';

  constructor(public contentService: ContentService) {
    // this.contentService.hasPage().subscribe( data => {
    //   this.hasPage = data[data.length - 1].payload.doc.data()["show"];
    //   this.title_Ar = data[data.length - 1].payload.doc.data()["title_Ar"];
    // });
  }

  ngOnInit() {}

  remove() {
    this.contentService.removeSixthPage();
  }

}
