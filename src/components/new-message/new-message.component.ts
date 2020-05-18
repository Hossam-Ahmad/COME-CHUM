import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ChatService } from 'src/services/chat.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {

  id;
  otherId;
  otherName;
  image;
  public membersList = [];
  public message = '';

  constructor(
    private chat: ChatService,
    private router: Router,
    public translate: TranslateService,
    private dialogRef: MatDialogRef<NewMessageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
      this.otherId = data.other_id;
      this.otherName = data.other_name;
      this.image = data.image;
    }

  ngOnInit() {
  }

  send() {
    if (this.message !== '') {
      this.chat.create(this.id, this.otherId, this.message).subscribe(data => {
        this.dialogRef.close();
        this.router.navigate(['/chat']);
      });
    }
  }

}
