import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class FinanceService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}finance/all/${pageId}`);
    }

    getStatictics(day = null, month = null, year = null): any {
      if (day) {
        return this.httpClient.get(`${environment.api}finance/statictics/${day}/${month}/${year}`);
      } else {
        return this.httpClient.get(`${environment.api}finance/statictics`);
      }
    }

}
