import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
  } from 'angular-6-social-login';

@Injectable()
export class SocialService {

    constructor(public httpClient: HttpClient,
                public router: Router,
                private socialAuthService: AuthService
       ) {}

    loginGoogle(id): any {
        return this.httpClient.get(`${environment.api}social/loginGoogle/${id}`);
    }

    loginFb(id): any {
        return this.httpClient.get(`${environment.api}social/loginFb/${id}`);
    }

    loginTwitter(): any {
        return this.httpClient.get(`${environment.api}social/loginTwitter`);
    }

}
