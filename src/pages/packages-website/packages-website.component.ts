import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../../services/packages.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MiscService } from 'src/services/misc.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-packages-website',
  templateUrl: './packages-website.component.html',
  styleUrls: ['./packages-website.component.scss']
})
export class PackagesWebsiteComponent implements OnInit {

  aboutHeight: any;
  public packages = [];
  public cover = '';
  pageId = 1;
  checked: boolean;

  constructor(
    public packagesService: PackagesService,
    public router: Router,
    public misc: MiscService,
    public translate: TranslateService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
  }

}
