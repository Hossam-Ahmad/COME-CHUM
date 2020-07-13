import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class EventsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}events/all/${pageId}`);
    }

    getAllWebsite(pageId, userId): any {
      return this.httpClient.get(`${environment.api}events/all/${pageId}/${userId}`);
    }

    getPosts(pageId, eventId): any {
      return this.httpClient.get(`${environment.api}events/feed/${eventId}/${pageId}`);
    }

    search(pageId, type, date): any {
      return this.httpClient.post(`${environment.api}events/search`, {
        pageId, type, date
      });
    }

    remove(userId): any {
      return this.httpClient.post(`${environment.api}events/remove`, {
        userId
      });
    }

}
