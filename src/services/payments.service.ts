import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class PaymentsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    chargeStripe(customerId , cardId, items): any {
      return this.httpClient.post(`${environment.api}payments/stripe/charge`, {
        customerId,
        cardId,
        items
      });
    }

    createCard(customerId , token): any {
      return this.httpClient.post(`${environment.api}payments/stripe/create_card`, {
        customerId,
        token
      });
    }

    getCards(customerId): any {
      return this.httpClient.post(`${environment.api}payments/stripe/get_cards`, {
        customerId
      });
    }

}
