import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dasboard-footer',
  templateUrl: './dasboard-footer.component.html',
  styleUrls: ['./dasboard-footer.component.scss']
})
export class DasboardFooterComponent implements OnInit {

  test: Date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
