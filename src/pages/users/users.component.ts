import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { environment } from 'src/environments/environment';

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
    this.usersService.remove(index).subscribe( data => {
      this.users.splice(index, 1);
    });
  }

  onScroll(event: any) {
    this.getUsers();
  }

}
