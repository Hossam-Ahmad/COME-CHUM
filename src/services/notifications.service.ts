import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class NotificationsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(userId, pageId): any {
      return this.httpClient.get(`${environment.api}notifications/all/${userId}/${pageId}`);
    }

}
