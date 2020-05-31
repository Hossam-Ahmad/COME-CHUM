import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ContentService } from 'src/services/content.service';

@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss']
})
export class AdvantagesComponent implements OnInit {

  aboutHeight: any;
  public advantages;
  public cover = '';
  pageId = 1;
  constructor(
    public contentService: ContentService,
    public router: Router) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.getAdvantages();
  }

  onScroll() {
    this.getAdvantages();
  }

  getAdvantages() {
    this.contentService.getAdvantages(this.pageId).subscribe(data => {
      this.advantages = data;
      console.log(data);
      this.pageId++;
    });
  }

  details(index) {
    this.router.navigate(['/cpanel/advantages-details'], { queryParams: { advantageId: this.advantages[index].id } });
  }

}
