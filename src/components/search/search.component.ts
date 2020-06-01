import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ChatService } from 'src/services/chat.service';
import { TranslateService } from '@ngx-translate/core';
import { InterestsService } from 'src/services/interests.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public from = '';
  public to = '';
  public country = '';
  public city = '';
  public travellers = '';
  public interests = [];
  public selectedInterests = [];
  private page = 1;

  constructor(
    private chat: ChatService,
    private router: Router,
    public translate: TranslateService,
    private interestsService: InterestsService,
    private dialogRef: MatDialogRef<SearchComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    }

  ngOnInit() {
    this.loadInterests();
  }

  loadInterests() {
    this.interestsService.getAll(this.page).subscribe( data => {
      this.interests = data;
      console.log(this.interests);
      this.selectedInterests = new Array<boolean>(this.interests.length).fill(false);
      console.log(this.selectedInterests);
      this.page++;
    });
  }

  search() {
    this.dialogRef.close();
    this.router.navigate(['/chat']);
  }

  select(index) {
    this.selectedInterests[index] = !this.selectedInterests[index];
  }

}
