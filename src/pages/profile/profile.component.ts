import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public h : any;
  public m : any;
  constructor() { 
    this.h = window.innerHeight;
    this.m = ((this.h)*(2/3)) + 'px';
    this.h += 'px';
    console.log(this.h);
  }

  ngOnInit(): void {
  }

}
