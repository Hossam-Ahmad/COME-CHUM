import { Component, OnInit, Inject } from '@angular/core';
import { GroupsService } from 'src/services/groups.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bulk-message',
  templateUrl: './bulk-message.component.html',
  styleUrls: ['./bulk-message.component.scss']
})
export class BulkMessageComponent implements OnInit {

  pageId = 1;
  groupId = 0;
  public membersList = [];

  constructor(
    private groupsService: GroupsService,
    private router: Router,
    private dialogRef: MatDialogRef<BulkMessageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.groupId = data.id;
    }

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.groupsService.getMembers(this.groupId, this.pageId).subscribe(data => {
      this.membersList = data;
      console.log(data);
      this.pageId++;
    });
  }

  onScroll() {
    this.getMembers();
  }

  back() {
    this.dialogRef.close();
  }

  open(index) {
    this.dialogRef.close();
    this.router.navigate(['/cpanel/user-details'], { queryParams: { userId: this.membersList[index].user_id } });
  }

}
