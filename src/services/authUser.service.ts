import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthUserService implements CanActivate {

  public userData = {
    name : '',
    id : '',
    image : '',
    email : '',
    cover : '',
    about : '',
  };

    constructor(public httpClient: HttpClient,
                public router: Router,
                private users: UsersService
       ) {}

    isAuthenticated() {
        return localStorage.getItem('tokenUser') != null;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isAuthenticated()) {
          if (route.url.toString() === 'login' || route.url.toString() === 'activate' || route.url.toString() === 'forget' || route.url.toString() === 'register' || route.url.toString() === 'faq' || route.url.toString() === 'terms') {
            this.router.navigate(['/feed']);
            return false;
          } else {
            return true;
          }
        } else {
            if (route.url.toString() !== 'login' && route.url.toString() !== 'activate' && route.url.toString() !== 'forget' && route.url.toString() !== 'register' && route.url.toString() !== 'faq' && route.url.toString() !== 'terms') {
            this.router.navigate(['/login']);
            return false;
          } else {
            return true;
          }
        }
    }

    setToken(token) {
        localStorage.setItem('tokenUser', token);
    }

    getToken() {
        return localStorage.getItem('tokenUser');
    }

    getData() {
      if (this.userData.id !== '') {
        console.log('from storage');
        return of(this.userData);
      } else {
        console.log('from api');
        return this.users.getByToken(this.getToken());
      }
    }

    login(email, password) {
      return this.httpClient.post(`${environment.api}users/auth`, {
        'email' : email,
        'password': password
      });
    }

    setUserData(data) {
      this.userData.id = data.id;
      this.userData.name = data.name;
      this.userData.email = data.email;
      this.userData.image = data.image;
      this.userData.cover = data.cover;
      this.userData.about = data.about;
    }

    changeCredentials(email, oldPassword, newPassword) {
      return this.httpClient.post(`${environment.api}users/auth`, {
        'email' : email,
        'oldPassword': oldPassword,
        'newdPassword': newPassword,
      });
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }

}
