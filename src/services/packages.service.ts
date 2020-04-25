import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class PackagesService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}packages/all/${pageId}`);
    }

    get(packageId): any {
      return this.httpClient.get(`${environment.api}packages/package/${packageId}`);
    }

    create(data): any {
      return this.httpClient.post(`${environment.api}packages/create`, {
        data
      });
    }

    update(packageId, data): any {
      return this.httpClient.post(`${environment.api}packages/update`, {
        id: packageId,
        data
      });
    }

    remove(packageId): any {
      return this.httpClient.post(`${environment.api}packages/remove`, {
        packageId
      });
    }

}
