import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class coverComponent implements OnInit {

  @Input() EntryData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
