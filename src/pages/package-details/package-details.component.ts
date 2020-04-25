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
  public userData;
  public btnTitle = 'اضافه';

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
          this.userData = data[0];
          if (this.userData !== undefined) {
            this.btnTitle = 'تعديل';
          }
          console.log(this.userData);
        });
      });
  }

  open() {
    const win = window.open(`${environment.host}profile/${this.userData.profile_id}`, '_blank');
    win.focus();
  }

}
