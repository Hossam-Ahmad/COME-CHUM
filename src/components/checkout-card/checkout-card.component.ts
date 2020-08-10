import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Router } from '@angular/router';
import { PaymentsService } from 'src/services/payments.service';
import { environment } from 'src/environments/environment';
import { AuthUserService } from 'src/services/authUser.service';
import { NotifierService } from 'angular-notifier';
import { UsersService } from 'src/services/users.service';

declare var TCO: any;

@Component({
  selector: 'app-checkout-card',
  templateUrl: './checkout-card.component.html',
  styleUrls: ['./checkout-card.component.scss']
})
export class CheckoutCardComponent implements OnInit {

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
    private userService: UsersService,
    private dialogRef: MatDialogRef<CheckoutCardComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
    }

  ngOnInit() {
  }

  send() {
    if (this.creditCard !== '' && this.cvc !== '' && this.expMonth !== '' && this.expYear !== '') {
      const cardData = {
        user_id : this.id,
        type : this.creditCard[0] === '4' ? 1 : 2,
        default_card : 1,
        card_number : this.creditCard,
        exp : this.expMonth + '/' + this.expYear,
        vcc : this.cvc
      };
      this.userService.createCard(cardData).subscribe(data => {
        console.log(data);
        this.dialogRef.close();
        window.location.reload();
      }, error => {
        console.log(error);
      });
      }
  }

}
