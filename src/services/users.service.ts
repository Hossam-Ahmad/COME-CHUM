import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class UsersService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}users/all/${pageId}`);
    }

    remove(userId): any {
      return this.httpClient.post(`${environment.api}users/remove`, {
        userId
      });
    }

    get(userId): any {
      return this.httpClient.get(`${environment.api}users/user/${userId}`);
    }

    forget(email): any {
      return this.httpClient.post(`${environment.api}users/forget`, {
        email
      });
    }

}
