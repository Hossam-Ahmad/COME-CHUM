import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UsersService {

    constructor(public httpClient: HttpClient,
                public router: Router,
                private translate: TranslateService
       ) {}

    register(data) {
      return this.httpClient.post(`${environment.api}users/create`, {
        data
      });
    }

    getAll(pageId): any {
      return this.httpClient.get(`${environment.api}users/all/${pageId}`);
    }

    remove(userId): any {
      return this.httpClient.post(`${environment.api}users/remove`, {
        userId
      });
    }

    get(userId): any {
      return this.httpClient.get(`${environment.api}users/user/${userId}`);
    }

    getByProfile(profileId): any {
      return this.httpClient.get(`${environment.api}users/user/profileId/${profileId}`);
    }

    getMessages(userId, pageId): any {
      return this.httpClient.get(`${environment.api}contact/unauthenticated/${userId}/${pageId}`);
    }

    send(data, type, userId): any {
      return this.httpClient.post(`${environment.api}users/send`, {
        data,
        type,
        userId
      });
    }

    getByToken(token): any {
      return this.httpClient.get(`${environment.api}users/user/token/${token}`);
    }

    forget(email): any {
      return this.httpClient.post(`${environment.api}users/forget`, {
        email
      });
    }

    update(token, data) {
      return this.httpClient.post(`${environment.api}users/update`, {
        data,
        token
      });
    }

    switchLanguage() {
      if (this.translate.currentLang === 'en') {
        this.translate.use('ar');
        localStorage.setItem('language', 'ar');
      } else {
        this.translate.use('en');
        localStorage.setItem('language', 'en');
      }
    }

    getCards(userId) {
      return this.httpClient.get(`${environment.api}users/cards/${userId}`);
    }

    defaultCard(id) {
      return this.httpClient.post(`${environment.api}users/cards/default_card`, {
        id
      });
    }

    createCard(data) {
      return this.httpClient.post(`${environment.api}users/cards/create_card`, {
        data
      });
    }

    search(data) {
      return this.httpClient.post(`${environment.api}users/search`, {
        data
      });
    }

    searchByPackage(package_id) {
      return this.httpClient.get(`${environment.api}users/packages/${package_id}`);
    }

}
