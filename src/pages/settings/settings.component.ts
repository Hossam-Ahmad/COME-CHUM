import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/authUser.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UsersService } from 'src/services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { LocationsService } from 'src/services/locations.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { CheckoutCardComponent } from 'src/components/checkout-card/checkout-card.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public activeId = 0;
  public country = '';
  public city = '';
  public gender = '';
  public phone = '';
  public postal_code = '';
  public name = '';
  public email = '';
  public mode = 'indeterminate';
  public loading = false;
  public color = 'white';
  public countries = [];
  public cities = [];
  public cards = [];

  public userData = undefined;

  constructor(
    public authService: AuthUserService,
    public router: Router,
    private notifierService: NotifierService,
    private users: UsersService,
    public translate: TranslateService,
    private locationsService: LocationsService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getGeneralData();
    this.getCountries();
  }

  changeTab(id) {
    this.activeId = id;
  }

  select() {
    document.getElementById('upload').click();
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }

  getGeneralData() {
    this.authService.getData().subscribe( data => {
      this.userData = data;
      console.log(this.userData);
      this.name = this.userData.name;
      this.email = this.userData.email;
      this.gender = this.userData.gender;
      this.country = this.userData.country;
      this.city = this.userData.city;
      this.phone = this.userData.phone;
      this.postal_code = this.userData.postal_code;
      this.getCities(this.country);
      this.getCards(this.userData.id);
    });
  }

  getCards(id) {
    this.users.getCards(id).subscribe(data => {
      this.cards = data as Array<any>;
      console.log(data);
    });
  }

  addCard() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: this.userData.id
      };
      dialogConfig.panelClass = 'colorize-background';
      this.dialog.open(CheckoutCardComponent, dialogConfig);
  }

  defaultCard(index) {
    this.users.defaultCard(this.cards[index].id).subscribe(data => {
      console.log(data);
      this.cards.forEach(card => {
        card.default_card = 0;
      });
      this.cards[index].default_card = 1;
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

  update() {
    if (this.userData.name !== '') {
      this.userData.name = this.name;
      this.userData.country = this.country;
      this.userData.city = this.city;
      this.userData.phone = this.phone;
      this.userData.postal_code = this.postal_code;
      this.loading = true;
      this.users.update(this.authService.getToken(), this.userData).subscribe( data => {
        this.loading = false;
        console.log(this.userData);
        this.notifierService.show({
          type : 'success',
          message: 'لقم تم تعديل بيانات الحساب',
        });
      });
    } else {
      this.notifierService.show({
        type : 'error',
        message: 'ادخل بيانات الحساب كامله',
      });
    }
  }

  reset() {
    this.loading = true;
    this.users.forget(this.email).subscribe( data => {
      if (data['status'] === 'not found') {
        this.loading = false;
        this.showNotification('ليس هناك حساب مسجل بهذا البريد الالكتروني', 'error');
      } else {
        this.loading = false;
        this.showNotification('لقد تم ارسال رسالة علي بريدك الالكتروني', 'success');
      }
    });
  }

  showNotification(text, type) {
    this.notifierService.show({
      type,
      message: text,
    });
  }

}
