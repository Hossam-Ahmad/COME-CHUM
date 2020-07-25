import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ContestsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}contests/all/${pageId}`);
    }

    get(contestId): any {
      return this.httpClient.get(`${environment.api}contests/contest/${contestId}`);
    }

    create(data): any {
      return this.httpClient.post(`${environment.api}contests/create`, {
        data
      });
    }

    update(contestId , data): any {
      return this.httpClient.post(`${environment.api}contests/update`, {
        contestId ,
        data
      });
    }

    remove(contestId): any {
      return this.httpClient.post(`${environment.api}contests/remove`, {
        contestId
      });
    }

    getContestWebsite(contestId): any {
      return this.httpClient.get(`${environment.api}contests/webcontest/${contestId}`);
    }

}
