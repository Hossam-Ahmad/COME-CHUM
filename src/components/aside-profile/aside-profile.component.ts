import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aside-profile',
  templateUrl: './aside-profile.component.html',
  styleUrls: ['./aside-profile.component.scss']
})
export class asideProfileComponent implements OnInit {
  @Input() userData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
