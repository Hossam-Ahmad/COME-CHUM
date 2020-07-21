import { Component, OnInit, Input } from '@angular/core';
import { MiscService } from 'src/services/misc.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-aside-profile',
  templateUrl: './aside-profile.component.html',
  styleUrls: ['./aside-profile.component.scss']
})
export class asideProfileComponent implements OnInit {
  @Input() EntryData;

  constructor(
    public misc: MiscService,
    public translate: TranslateService) {
  }

  ngOnInit(): void {
  }

}
