import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  aboutHeight: any;
  public users = [];
  public cover = '';
  pageId = 1;
  constructor(public usersService: UsersService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
    this.initData();
  }

  initData() {
    this.usersService.getAll(this.pageId).subscribe(data => {
      this.users = data;
      console.log(data);
      this.pageId++;
    });
  }

  ngOnInit() {
  }

}
