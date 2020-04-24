import { Component, OnInit } from '@angular/core';
import { GroupsService } from '../../services/groups.service';
import { environment } from 'src/environments/environment';
import { MiscService } from 'src/services/misc.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { MembersComponent } from 'src/components/members/members.component';

@Component({
  selector: 'app-users',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  aboutHeight: any;
  public groups = [];
  public membersList = [];
  public cover = '';
  pageId = 1;
  pageIdMembers = 1;
  constructor(
    public groupsService: GroupsService,
    public misc: MiscService,
    private dialog: MatDialog
    ) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getGroups();
  }

  getGroups() {
    this.groupsService.getAll(this.pageId).subscribe(data => {
      this.groups = data;
      console.log(data);
      this.pageId++;
    });
  }

  open(index) {
    const win = window.open(`${environment.host}group/${this.groups[index].group_id}`, '_blank');
    win.focus();
  }

  remove(index) {
    this.groupsService.remove(this.groups[index].id).subscribe( data => {
      this.groups.splice(index, 1);
    });
  }

  onScroll() {
    this.getGroups();
  }

  members(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.groups[index].id
    };
    dialogConfig.panelClass = 'colorize-background';
    this.dialog.open(MembersComponent, dialogConfig);
  }

}
