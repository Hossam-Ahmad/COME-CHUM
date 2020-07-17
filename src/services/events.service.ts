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

    getEvent(eventId, userId): any {
      return this.httpClient.get(`${environment.api}events/${eventId}/${userId}`);
    }

    getPosts(eventId, userId, pageId): any {
      return this.httpClient.get(`${environment.api}events/feed/${eventId}/${userId}/${pageId}`);
    }

    search(pageId, type, date): any {
      return this.httpClient.post(`${environment.api}events/search`, {
        pageId, type, date
      });
    }

    createPost(data): any {
      return this.httpClient.post(`${environment.api}events/feed/create`, {
        data
      });
    }

    remove(userId): any {
      return this.httpClient.post(`${environment.api}events/remove`, {
        userId
      });
    }

    join(userId, eventId): any {
      return this.httpClient.post(`${environment.api}events/join`, {
        userId,
        eventId
      });
    }

    leave(userId, eventId): any {
      return this.httpClient.post(`${environment.api}events/leave`, {
        userId,
        eventId
      });
    }

}
