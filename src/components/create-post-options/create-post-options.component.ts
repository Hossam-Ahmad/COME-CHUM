import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ChatService } from 'src/services/chat.service';
import { TranslateService } from '@ngx-translate/core';
import { InterestsService } from 'src/services/interests.service';
import { LocationsService } from 'src/services/locations.service';
import { NotifierService } from 'angular-notifier';
import { FeedService } from 'src/services/feed.servie';

@Component({
  selector: 'app-create-post-options',
  templateUrl: './create-post-options.component.html',
  styleUrls: ['./create-post-options.component.scss']
})
export class CreatePostOptionsComponent implements OnInit {

  public post_data;
  public country = -1;
  public city = -1;
  public from;
  public to;
  public travellers = -1;
  public countries = [];
  public cities = [];

  constructor(
    private chat: ChatService,
    private router: Router,
    public translate: TranslateService,
    private interestsService: InterestsService,
    private locationsService: LocationsService,
    private notifierService: NotifierService,
    private feed: FeedService,
    private dialogRef: MatDialogRef<CreatePostOptionsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.post_data = data.post_data;
    }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.locationsService.getCountries(this.translate.currentLang).subscribe( data => {
      this.countries = data as Array<any>;
      console.log(data);
    });
  }

  getCities(countryId) {
    this.locationsService.getCities(countryId, this.translate.currentLang).subscribe( data => {
      this.cities = data as Array<any>;
      console.log(data);
    });
  }

  post() {
    if (this.post_data.body !== '') {
      this.post_data.country = this.country;
      this.post_data.city = this.city;
      this.post_data.from = this.from;
      this.post_data.to = this.to;
      if (this.from) { this.post_data.date_from = new Date(this.from).toISOString(); }
      if (this.to) { this.post_data.date_to = new Date(this.to).toISOString(); }
      this.post_data.persons = this.travellers;
      this.feed.create(this.post_data).subscribe( data => {
        this.dialogRef.close(this.post_data);
        console.log(data);
        this.notifierService.show({
          type : 'success',
          message: 'تم نشر المنشور بنجاح',
        });
      });
    } else {
      this.notifierService.show({
        type : 'error',
        message: 'المنشور فارغ',
      });
    }
  }

}
