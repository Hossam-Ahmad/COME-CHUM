import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/authUser.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialService } from 'src/services/social.service';
import { NotifierService } from 'angular-notifier';
import { InterestsService } from 'src/services/interests.service';
import { TranslateService } from '@ngx-translate/core';
import { LocationsService } from 'src/services/locations.service';
import { UsersService } from 'src/services/users.service';
import { ContestComponent } from 'src/components/contest/contest.component';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';


@Component({
  selector: 'app-register-website',
  templateUrl: './register-website.component.html',
  styleUrls: ['./register-website.component.scss']
})
export class RegisterWebsiteComponent implements OnInit {

  public social_media = true;
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
  public profile_picture = '';
  public prefix_phone = '+966';
  public cover = '';
  public height;
  public loading = false;
  public phase = 1;
  public interests = [];
  public countries = [];
  public cities = [];
  selectedInterests = [];
  page = 1;
  private social_id_key = '';
  private social_id_value = '';
  private social_token_key = '';
  private social_token_value = '';


  color = 'white';
  mode = 'indeterminate';

  constructor(
    public router: Router,
    private social: SocialService,
    private notifierService: NotifierService,
    private interestsService: InterestsService,
    private locationsService: LocationsService,
    public translate: TranslateService,
    private usersService: UsersService,
    private socialAuthService: AuthService,
    private authService: AuthUserService,
    private route: ActivatedRoute) {
    this.height = window.innerHeight + 'px';
    const navigation = this.router.getCurrentNavigation();
    this.email = navigation.extras.state ? navigation.extras.state.email : '';
    this.password = navigation.extras.state ? navigation.extras.state.password : '';
    this.route.queryParams.subscribe(params => {
      if (params['status'] === 'failed') {
        this.social_media = false;
        this.name = params['name'];
        this.social_id_key = 'twitter_id';
        this.social_id_value = params['id'];
        this.social_token_key = 'twitter_token';
        this.social_token_value = params['token'];
      } else {
        this.notifierService.show({
          type : 'error',
          message: 'هناك حساب مربوط بهذه البيانات',
        });
      }
    });
  }

  ngOnInit() {
    this.loadInterests();
    this.getCountries();
  }

  continue() {
    if (this.phase === 5) {
      this.register();
    }
    this.phase++;
  }

  back() {
    if (this.phase > 0) {
      this.phase--;
    }
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

  register() {
    const interestsParm = [];
    for (let i = 0 ; i < this.interests.length; i++) {
      if (this.selectedInterests[i]) {
        interestsParm.push(this.interests[i].id);
      }
    }
    const userData = {
      name : this.name,
      email : this.email,
      password : this.password,
      prefix : this.prefix_phone,
      phone : this.phone,
      country : this.country,
      city : this.city,
      gender : this.gender,
      profile_picture : this.profile_picture,
      cover : this.cover,
      about : this.about,
      postal_code : this.postal_code,
      interests : interestsParm
    };
    if (this.social_id_key !== '') {
      userData[this.social_id_key] = this.social_id_value;
      userData[this.social_token_key] = this.social_token_value;
    }
    this.usersService.register(userData).subscribe( data => {
      this.router.navigateByUrl('/activate');
    });
  }

  loginTwitter() {
    this.social.loginTwitter().subscribe(data => {
      const d = new Date();
      d.setTime(d.getTime() +  24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;
      document.cookie = `requestToken=${data['requestToken']}; ${expires}`;
      document.cookie = `requestTokenSecret=${data['requestTokenSecret']}; ${expires}`;
      document.cookie = `source_link_twitter=/register; ${expires}`;
      window.location.href = `https://twitter.com/oauth/authenticate?oauth_token=${data['requestToken']}`;
    });
  }

  loginGoogle(): void {

    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log('google sign in data : ' , userData);
        this.social.loginGoogle(userData.id).subscribe( data => {
          console.log(data);
          if (data['status'] === 'success') {
            this.loading = false;
            this.notifierService.show({
              type : 'error',
              message: 'هناك حساب مربوط بهذه البيانات',
            });
          } else {
            this.social_media = false;
            this.email = userData.email;
            this.name = userData.name;
            this.profile_picture = userData.image;
            this.social_id_key = 'google_id';
            this.social_id_value = userData.id;
            this.social_token_key = 'google_token';
            this.social_token_value = userData.token;
          }
        });
      }
    );
  }

  loginFB(): void {

    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log(userData);
        this.social.loginFb(userData.id).subscribe( data => {
          console.log(data);
          if (data['status'] === 'success') {
              this.loading = false;
              this.notifierService.show({
                type : 'error',
                message: 'هناك حساب مربوط بهذه البيانات',
              });
          } else {
            this.loading = false;
            this.social_media = false;
            this.email = userData.email;
            this.name = userData.name;
            this.profile_picture = userData.image;
            this.social_id_key = 'fb_id';
            this.social_id_value = userData.id;
            this.social_token_key = 'fb_token';
            this.social_token_value = userData.token;
          }
        });
      });
  }

}
