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

    get(contactId): any {
        return this.httpClient.get(`${environment.api}contact/${contactId}`);
    }

    getMessages(contactId, pageId): any {
        return this.httpClient.get(`${environment.api}contact/${contactId}/${pageId}`);
    }

    send(data, type , contactId, sender): any {
        return this.httpClient.post(`${environment.api}contact/send` , {
            data, type, contactId, sender
        });
    }

    upload(data , type): any {
        return this.httpClient.post(`${environment.api}contact/upload` , {
            data, type
        });
    }

}
