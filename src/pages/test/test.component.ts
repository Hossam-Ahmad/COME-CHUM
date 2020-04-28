import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentsService } from 'src/services/payments.service';

declare var stripe: any;
declare var elements: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements AfterViewInit, OnDestroy {

  @ViewChild('cardInfo', {static: true}) cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(private cd: ChangeDetectorRef,
              private payment: PaymentsService) {}

  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };

    this.card = elements.create('card', {style});
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await stripe.createToken(this.card);
    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      this.payment.getCards('cus_HAu1RVsRzUTrQE').subscribe( data => {
        console.log(data);
      });

      // this.payment.createCard('cus_HAu1RVsRzUTrQE', token.id).subscribe( data => {
      //   console.log(data);
      // });

      this.payment.chargeStripe('cus_HAu1RVsRzUTrQE' , 'card_1GcehQBgK03mDK237j08RBtI' , []).subscribe( data => {
          console.log(data);
        });

      // ...send the token to the your backend to process the charge
    }
  }
}
