import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class BlogsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}blogs/all/${pageId}`);
    }

    getMembers(blogId, data): any {
      return this.httpClient.get(`${environment.api}blogs/update/${groupId}/${data}`);
    }

    remove(blogId): any {
      return this.httpClient.post(`${environment.api}blogs/remove`, {
        blogId
      });
    }

}
