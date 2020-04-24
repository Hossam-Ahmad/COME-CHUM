import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MiscService } from 'src/services/misc.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  aboutHeight: any;
  public users = [];
  public cover = '';
  pageId = 1;
  constructor(
    public usersService: UsersService,
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
    this.usersService.getAll(this.pageId).subscribe(data => {
      this.users = data;
      console.log(data);
      this.pageId++;
    });
  }

  open(index) {
    const win = window.open(`${environment.host}profile/${this.users[index].profile_id}`, '_blank');
    win.focus();
  }

  remove(index) {
    this.usersService.remove(this.users[index].id).subscribe( data => {
      this.users.splice(index, 1);
    });
  }

  onScroll() {
    this.getUsers();
  }

  details(index) {
    this.router.navigate(['/cpanel/user-details'], { queryParams: { userId: this.users[index].id } });
  }

}
