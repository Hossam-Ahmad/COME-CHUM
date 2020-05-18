import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { PaymentsService } from 'src/services/payments.service';
import { environment } from 'src/environments/environment';
import { AuthUserService } from 'src/services/authUser.service';
import { NotifierService } from 'angular-notifier';

declare var TCO: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  id;
  packageName;
  price;
  public creditCard = '';
  public expMonth = '';
  public expYear = '';
  public cvc = '';

  constructor(
    private payment: PaymentsService,
    private router: Router,
    private auth: AuthUserService,
    private notifierService: NotifierService,
    private dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
      this.packageName = data.packageName;
      this.price = data.price;
    }

  ngOnInit() {
  }

  send() {
    if (this.creditCard !== '' && this.cvc !== '' && this.expMonth !== '' && this.expYear !== '') {

      TCO.loadPubKey('sandbox', () => {
        // Sandbox Public Key is loaded
        const args = {
          sellerId: environment.tco_sellerId,
          publishableKey: environment.tco_publishableKey,
          ccNo: this.creditCard,
          cvv: this.cvc,
          expMonth: this.expMonth,
          expYear: this.expYear,
      };
        // Make the token request
        TCO.requestToken(success => {
          console.log(success.response.token.token);
          this.auth.getData().subscribe(data => {
            this.payment.chargeTCO(success.response.token.token, data.name, data.email,
              data.country, data.city, data.phone, this.price).subscribe( data2 => {
                console.log(data2);
                this.dialogRef.close();
                this.router.navigate(['/']);
            });
          });
        }, error => {
          console.log(error);
        }, args);
      });​
    }
  }

}
