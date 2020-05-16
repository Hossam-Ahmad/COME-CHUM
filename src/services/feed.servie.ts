import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class FeedService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(userId, pageId): any {
      return this.httpClient.get(`${environment.api}feed/all/${userId}/${pageId}`);
    }

    get(feedId): any {
      return this.httpClient.get(`${environment.api}feed/feed/${feedId}`);
    }

    create(data): any {
      return this.httpClient.post(`${environment.api}feed/create`, {
        data
      });
    }

    create_comment(postId, text, userId): any {
      return this.httpClient.post(`${environment.api}feed/create_comment`, {
        postId, text, userId
      });
    }

    like(postId, userId): any {
      return this.httpClient.post(`${environment.api}feed/like`, {
        postId, userId
      });
    }

    dislike(postId, userId): any {
      return this.httpClient.post(`${environment.api}feed/dislike`, {
        postId, userId
      });
    }

    update(feedId, data): any {
      return this.httpClient.post(`${environment.api}feed/update`, {
        feedId,
        data
      });
    }

    remove(feedId): any {
      return this.httpClient.post(`${environment.api}feed/remove`, {
        feedId
      });
    }

    search(text): any {
      return this.httpClient.post(`${environment.api}feed/search`, {
        text
      });
    }

    load_comments(postId, pageId): any {
      return this.httpClient.get(`${environment.api}feed/load_comments/${postId}/${pageId}`);
    }

}
