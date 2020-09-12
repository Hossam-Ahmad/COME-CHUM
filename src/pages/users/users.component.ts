import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PackagesService } from '../../services/packages.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MiscService } from 'src/services/misc.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  aboutHeight: any;
  public users = [];
  public packages = [];
  public cover = '';
  public package = 0;
  pageId = 1;

  public search_flag = 0;
  public name_search = '';
  public email_search = '';
  public package_search = -1;
  constructor(
    public usersService: UsersService,
    public router: Router,
    public misc: MiscService,
    public packagesService: PackagesService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getUsers();
    this.getPackages();
  }

  getUsers() {
    this.usersService.getAll(this.pageId).subscribe(data => {
      this.users = data;
      console.log(data);
      this.pageId++;
    });
  }

  getPackages() {
    this.packagesService.getAll(1).subscribe( data => {
      this.packages = data;
      console.log(this.packages);
    });
  }

  open(index) {
    const win = window.open(`${environment.host}profile?userId=${this.users[index].profile_id}`, '_blank');
    win.focus();
  }

  remove(index) {
    this.usersService.remove(this.users[index].id).subscribe( data => {
      this.users.splice(index, 1);
    });
  }

  onScroll() {
    if(this.search_flag == 0) {
      this.getUsers();
    }
  }

  details(index) {
    this.router.navigate(['/cpanel/user-details'], { queryParams: { userId: this.users[index].id } });
  }

  search() {
    this.search_flag = 1;
    this.usersService.search({
      name_search : this.name_search,
      email_search : this.email_search,
      package_search : this.package_search
    }).subscribe( data => {
      this.users = data as Array<any>;
      console.log(data);
    });
  }

}
