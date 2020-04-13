import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ContactService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}contact/all/${pageId}`);
    }

    send(data, type , contactId): any {
        return this.httpClient.post(`${environment.api}contact/send` , {
            data, type, contactId
        });
    }

    upload(data , type): any {
        return this.httpClient.post(`${environment.api}contact/upload` , {
            data, type
        });
    }

}
