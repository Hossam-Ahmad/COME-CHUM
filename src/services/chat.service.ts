import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ChatService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getAll(type, pageId, userId): any {
      return this.httpClient.get(`${environment.api}chat/all/${type}/${pageId}/${userId}`);
    }

    get(chatId, pageId): any {
        return this.httpClient.get(`${environment.api}chat/${chatId}/${pageId}`);
    }

    send(data, type , chatId , userId): any {
        return this.httpClient.post(`${environment.api}chat/send` , {
            data, type, chatId, userId
        });
    }

    create(userId, userId2 , message): any {
        return this.httpClient.post(`${environment.api}chat/create` , {
            userId, userId2, message
        });
    }

    search(query, userId, pageId): any {
        return this.httpClient.get(`${environment.api}chat/search/${query}/${userId}/${pageId}`);
    }

    upload(data , type): any {
        return this.httpClient.post(`${environment.api}contact/upload` , {
            data, type
        });
    }

}
