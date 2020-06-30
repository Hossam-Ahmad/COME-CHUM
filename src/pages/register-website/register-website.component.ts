import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SocialService } from 'src/services/social.service';
import { NotifierService } from 'angular-notifier';
import { InterestsService } from 'src/services/interests.service';
import { TranslateService } from '@ngx-translate/core';
import { LocationsService } from 'src/services/locations.service';


@Component({
  selector: 'app-register-website',
  templateUrl: './register-website.component.html',
  styleUrls: ['./register-website.component.scss']
})
export class RegisterWebsiteComponent implements OnInit {

  public email = '';
  public name = '';
  public password = '';
  public repassword = '';
  public gender = '';
  public country = '';
  public city = '';
  public about = '';
  public postal_code = '';
  public phone = '';
  public height;
  public loading = false;
  public phase = 1;
  public interests = [];
  public countries = [];
  public cities = [];
  selectedInterests = [];
  page = 1;


  color = 'white';
  mode = 'indeterminate';

  constructor(
    public authService: AuthService,
    public router: Router,
    private social: SocialService,
    private notifierService: NotifierService,
    private interestsService: InterestsService,
    private locationsService: LocationsService,
    public translate: TranslateService) {
    this.height = window.innerHeight + 'px';
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation.extras.state ? navigation.extras.state.email : '';
    this.password = navigation.extras.state ? navigation.extras.state.password : '';
  }

  ngOnInit() {
    this.loadInterests();
    this.getCountries();
  }

  loginTwitter() {
    this.social.loginTwitter().subscribe(data => {

      const d = new Date();
      d.setTime(d.getTime() +  24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `requestToken=${data['requestToken']}; ${expires}`;
      document.cookie = `requestTokenSecret=${data['requestTokenSecret']}; ${expires}`;
      window.location.href = `https://twitter.com/oauth/authenticate?oauth_token=${data['requestToken']}`;
    });
  }

  loginFB() {

  }

  loginInsta() {

  }

  continue() {
    this.phase++;
  }

  forget() {
    this.router.navigateByUrl('/cpanel/forget');
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

}
