import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class GroupsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}groups/all/${pageId}`);
    }

    getGroup(groupId, userId): any {
      return this.httpClient.get(`${environment.api}groups/${groupId}/${userId}`);
    }

    getMembers(groupId, pageId): any {
      return this.httpClient.get(`${environment.api}groups/members/${groupId}/${pageId}`);
    }

    remove(userId): any {
      return this.httpClient.post(`${environment.api}groups/remove`, {
        userId
      });
    }

    getPosts(groupId, userId, pageId): any {
      return this.httpClient.get(`${environment.api}groups/feed/${groupId}/${userId}/${pageId}`);
    }

    search(pageId, type, date): any {
      return this.httpClient.post(`${environment.api}groups/search`, {
        pageId, type, date
      });
    }

    createPost(data): any {
      return this.httpClient.post(`${environment.api}groups/feed/create`, {
        data
      });
    }

    like(groupId, postId, userId): any {
      return this.httpClient.post(`${environment.api}groups/feed/like`, {
        groupId, postId, userId
      });
    }

    dislike(groupId, postId, userId): any {
      return this.httpClient.post(`${environment.api}groups/feed/dislike`, {
        groupId, postId, userId
      });
    }

    create_comment(groupId, postId, text, userId): any {
      return this.httpClient.post(`${environment.api}groups/feed/create_comment`, {
        groupId, postId, text, userId
      });
    }

    load_comments(groupId, postId, pageId): any {
      return this.httpClient.get(`${environment.api}groups/feed/load_comments/${groupId}/${postId}/${pageId}`);
    }

    load_images(groupId, pageId): any {
      return this.httpClient.get(`${environment.api}groups/group/feed/images/${groupId}/${pageId}`);
    }

    load_videos(groupId, pageId): any {
      return this.httpClient.get(`${environment.api}groups/group/feed/videos/${groupId}/${pageId}`);
    }

    join(userId, groupId): any {
      return this.httpClient.post(`${environment.api}groups/join`, {
        userId,
        groupId
      });
    }

    leave(userId, groupId): any {
      return this.httpClient.post(`${environment.api}groups/leave`, {
        userId,
        groupId
      });
    }

}
