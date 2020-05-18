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

    getTop(): any {
      return this.httpClient.get(`${environment.api}blogs/top`);
    }

    get(blogId): any {
      return this.httpClient.get(`${environment.api}blogs/blog/${blogId}`);
    }

    create(data): any {
      return this.httpClient.post(`${environment.api}blogs/create`, {
        data
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

}
