import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class StaticticsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(package_id): any {
      return this.httpClient.get(`${environment.api}statictics/all/${package_id}`);
    }

}
