import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class SocialService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    loginInstagram() {
        return this.httpClient.get(`${environment.api}social/loginInsta`);
    }

    loginFacebook() {

    }

    loginTwitter() {
        return this.httpClient.get(`${environment.api}social/loginTwitter`);
    }

}
