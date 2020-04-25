import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../../services/packages.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MiscService } from 'src/services/misc.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  aboutHeight: any;
  public packages = [];
  public cover = '';
  pageId = 1;
  constructor(
    public packagesService: PackagesService,
    public router: Router,
    public misc: MiscService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getUsers();
  }

  getUsers() {
    this.packagesService.getAll(this.pageId).subscribe(data => {
      this.packages = data;
      console.log(data);
      this.pageId++;
    });
  }

  remove(index) {
    this.packagesService.remove(this.packages[index].id).subscribe( data => {
      this.packages.splice(index, 1);
    });
  }

  onScroll() {
    this.getUsers();
  }

  update(index) {
    this.router.navigate(['/cpanel/package-details'], { queryParams: { packageId: this.packages[index].id } });
  }

}
