import { Component, OnInit } from '@angular/core';
import { PackagesService } from '../../services/packages.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { MiscService } from 'src/services/misc.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthUserService } from 'src/services/authUser.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { CheckoutComponent } from 'src/components/checkout/checkout.component';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-packages-website',
  templateUrl: './packages-website.component.html',
  styleUrls: ['./packages-website.component.scss']
})
export class PackagesWebsiteComponent implements OnInit {

  aboutHeight: any;
  public package = 0;
  public packages = [{
    name : 'FREE Package',
    price : '0'
  }, {
    name : 'Basic Package',
    price : '25'
  }, {
    name : 'Advances Package',
    price : '70'
  }, {
    name : 'Premuim Package',
    price : '130'
  }];
  public cover = '';
  pageId = 1;
  checked = false;

  constructor(
    public packagesService: PackagesService,
    public router: Router,
    public misc: MiscService,
    public translate: TranslateService,
    private dialog: MatDialog,
    public auth: AuthUserService,
    private notifierService: NotifierService,
    private activatedRoute: ActivatedRoute,
    private userService: AuthUserService) {
    this.aboutHeight = (window.innerHeight) * ( 2 / 3 ) + 'px';
  }

  ngOnInit() {
    this.package = Number(this.userService.userData.package);
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['error'] === 1) {
        this.notifierService.show({
          type : 'error',
          message: 'لقد انتهت باقتك و يجب عليك اختيار باقه للاستمرار',
        });
      }
    });
  }

  subscribe(index) {
    this.auth.getData().subscribe(data => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        id: data.id,
        packageName : this.packages[index].name,
        price : this.packages[index].price
      };
      dialogConfig.panelClass = 'colorize-background';
      this.dialog.open(CheckoutComponent, dialogConfig);
    });
  }

}
