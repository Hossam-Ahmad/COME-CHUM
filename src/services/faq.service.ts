import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class FaqService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}faq/all/${pageId}`);
    }

    get(faqId): any {
      return this.httpClient.get(`${environment.api}faq/faq/${faqId}`);
    }

    create(data): any {
      return this.httpClient.post(`${environment.api}faq/create`, {
        data
      });
    }

    update(faqId, data): any {
      return this.httpClient.post(`${environment.api}faq/update`, {
        faqId,
        data
      });
    }

    remove(faqId): any {
      return this.httpClient.post(`${environment.api}faq/remove`, {
        faqId
      });
    }

    search(text): any {
      return this.httpClient.post(`${environment.api}faq/search`, {
        text
      });
    }

}
