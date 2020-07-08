import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { ChatService } from 'src/services/chat.service';
import { TranslateService } from '@ngx-translate/core';
import { InterestsService } from 'src/services/interests.service';
import { LocationsService } from 'src/services/locations.service';

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
  public countries = [];
  public cities = [];
  public selectedInterests = [];
  private page = 1;

  constructor(
    private chat: ChatService,
    private router: Router,
    public translate: TranslateService,
    private interestsService: InterestsService,
    private locationsService: LocationsService,
    private dialogRef: MatDialogRef<SearchComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    }

  ngOnInit() {
    this.loadInterests();
    this.getCountries();
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

  search() {
    this.router.navigate(['result'], { queryParams: { from: this.from, to: this.to, country: this.country, city: this.city, 
      persons: this.travellers } });
    this.dialogRef.close();
  }

  select(index) {
    this.selectedInterests[index] = !this.selectedInterests[index];
  }

}
