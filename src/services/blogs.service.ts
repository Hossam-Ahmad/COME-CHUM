import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class BlogsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId, userId): any {
      return this.httpClient.get(`${environment.api}blogs/all/${pageId}/${userId}`);
    }

    getAllDashboard(pageId): any {
      return this.httpClient.get(`${environment.api}blogs/all/${pageId}`);
    }

    getTop(): any {
      return this.httpClient.get(`${environment.api}blogs/top`);
    }

    get(blogId): any {
      return this.httpClient.get(`${environment.api}blogs/blog/${blogId}`);
    }

    getBlogWebsite(blogId, userId): any {
      return this.httpClient.get(`${environment.api}blogs/blog/${blogId}/${userId}`);
    }

    create(data): any {
      return this.httpClient.post(`${environment.api}blogs/create`, {
        data
      });
    }

    like(blogId, userId): any {
      return this.httpClient.post(`${environment.api}blogs/like`,
        {
          blogId,
          userId
        });
    }

    dislike(blogId, userId): any {
      return this.httpClient.post(`${environment.api}blogs/dislike`, {
        blogId,
        userId
      });
    }

    update(blogId, data): any {
      return this.httpClient.post(`${environment.api}blogs/update`, {
        blogId,
        data
      });
    }

    remove(blogId): any {
      return this.httpClient.post(`${environment.api}blogs/remove`, {
        blogId
      });
    }

    create_comment(blogId, text, userId): any {
      return this.httpClient.post(`${environment.api}blogs/create_comment`, {
        blogId, text, userId
      });
    }

    load_comments(blogId, pageId): any {
      return this.httpClient.get(`${environment.api}blogs/load_comments/${blogId}/${pageId}`);
    }

}
