import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class SettingsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    get(name): any {
      return this.httpClient.get(`${environment.api}settings/key/${name}`);
    }

    getTerms(language): any {
        return this.httpClient.get(`${environment.api}settings/terms/${language}`);
    }

}
