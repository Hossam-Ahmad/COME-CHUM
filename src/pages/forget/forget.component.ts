import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {

  public height;
  public email = '';

  constructor() {
    this.height = window.innerHeight + 'px';
  }

  ngOnInit() {
  }

  send() {
    if (this.email !== '') {

    } else {
      alert('قم بإدخال البريد الالكتروني');
    }
  }

}
