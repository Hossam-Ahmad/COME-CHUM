import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class InterestsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}interests/all/${pageId}`);
    }

    get(interestId): any {
      return this.httpClient.get(`${environment.api}interests/interest/${interestId}`);
    }

    create(data): any {
      return this.httpClient.post(`${environment.api}interests/create`, {
        data
      });
    }

    update(interestId, data): any {
      return this.httpClient.post(`${environment.api}interests/update`, {
        interestId,
        data
      });
    }

    remove(interestId): any {
      return this.httpClient.post(`${environment.api}interests/remove`, {
        interestId
      });
    }

}
