import { Component, OnInit } from '@angular/core';
import { ContestsService } from '../../services/contests.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {

  aboutHeight: any;
  public contests = [];
  public cover = '';
  pageId = 1;
  constructor(public contestService: ContestsService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getGroups();
  }

  getGroups() {
    this.contestService.getAll(this.pageId).subscribe(data => {
      this.contests = data;
      console.log(data);
      this.pageId++;
    });
  }

  open(index) {
    const win = window.open(`${environment.host}contest/${this.contests[index].contest_id}`, '_blank');
    win.focus();
  }

  remove(index) {
    this.contestService.remove(this.contests[index].id).subscribe( data => {
      this.contests.splice(index, 1);
    });
  }

  onScroll() {
    this.getGroups();
  }

  details(index) {

  }

  update(index) {
    
  }

}
