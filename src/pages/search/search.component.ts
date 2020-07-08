import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/services/chat.service';
import { TranslateService } from '@ngx-translate/core';
import { InterestsService } from 'src/services/interests.service';
import { LocationsService } from 'src/services/locations.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchPageComponent implements OnInit {

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
    private locationsService: LocationsService) {

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

  select(index) {
    this.selectedInterests[index] = !this.selectedInterests[index];
  }

  search() {
    let data = {};
    if (this.from !== '') {
      data['from'] = new Date(this.from).toISOString().split('T')[0];
    }
    if (this.to !== '') {
      data['to'] = new Date(this.to).toISOString().split('T')[0];
    }
    if (this.country !== '') {
      data['country'] = this.country;
    }
    if (this.city !== '') {
      data['city'] = this.city;
    }
    if (this.travellers !== '') {
      data['persons'] = this.travellers;
    }
    let interestsParm = [];
    for (let i = 0 ; i < this.interests.length; i++) {
      if (this.selectedInterests[i]) {
        interestsParm.push(this.interests[i].id);
      }
    }
    if (interestsParm.length > 0 ) {
      data['interests'] = interestsParm;
    }
    if (Object.keys(data).length > 0) {
      this.router.navigate(['result'], { queryParams: {data : JSON.stringify(data)} });
    }
  }

}
