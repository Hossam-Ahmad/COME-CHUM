import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PackagesService } from 'src/services/packages.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {

  packageId;
  public packageData;
  public btnTitle = 'اضافه';

  public name;
  public price_month;
  public price_year;
  public details;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private packagesService: PackagesService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.packageId = params['packageId'];
        this.packagesService.get(this.packageId).subscribe( data => {
          if (data != null) {
            this.packageData = data[0];
            this.name = this.packageData.name;
            this.details = this.packageData.details;
            this.price_month = this.packageData.price_month;
            this.price_year = this.packageData.price_year;
            this.btnTitle = 'تعديل';
          }
        });
      });
  }

  open() {
    const win = window.open(`${environment.host}profile/${this.packageData.profile_id}`, '_blank');
    win.focus();
  }

  perform() {
    if (this.packageData) { // update
      console.log(this.packageData);
      this.packagesService.update(
        this.packageId,
        {
        name : this.name,
        details : this.details,
        price_month : this.price_month,
        price_year : this.price_year
      }).subscribe( data => {
        this.router.navigate(['/cpanel/packages']);
      });
    } else {// create
      if (this.name !== '' && this.details !== '') {
        this.packagesService.create({
          name : this.name,
          details : this.details,
          price_month : this.price_month,
          price_year : this.price_year
        }).subscribe( data => {
          this.router.navigate(['/cpanel/packages']);
        });
      } else {
        alert('ادخل كل بيانات الباقة');
      }
    }
  }

}
