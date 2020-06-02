import { Component, OnInit, Input } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  public h;
  public m;
  @Input() data;

  showNavigationArrows = false;
  showNavigationIndicators = true;

  constructor(config: NgbCarouselConfig) {
    this.h = window.innerHeight;
    this.m = ((this.h) * ( 2 / 3)) + 'px';
    this.h += 'px';
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
