import { Component, OnInit } from '@angular/core';
import { InterestsService } from '../../services/interests.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  aboutHeight: any;
  public interests = [];
  public cover = '';
  pageId = 1;
  constructor(
    public interestsService: InterestsService,
    public router: Router) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.getInterests();
  }

  getInterests() {
    this.interestsService.getAll(this.pageId).subscribe(data => {
      this.interests = data;
      console.log(data);
      this.pageId++;
    });
  }

  onScroll() {
    this.getInterests();
  }

  details(index) {
    this.router.navigate(['/cpanel/interest-details'], { queryParams: { interestId: this.interests[index].id } });
  }

  remove(index) {
    this.interestsService.remove(this.interests[index].id).subscribe( data => {
      this.interests.splice(index, 1);
    });
  }

}
