import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService implements CanActivate {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    isAuthenticated() {
        return localStorage.getItem('token') != null;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isAuthenticated()) {
          if (route.url.toString() === 'login' || route.url.toString() === 'change' || route.url.toString() === 'forget') {
            this.router.navigate(['/cpanel/dashboard']);
            return false;
          } else {
            return true;
          }
        } else {
          if (route.url.toString() !== 'login' && route.url.toString() !== 'change' && route.url.toString() !== 'forget') {
            this.router.navigate(['/cpanel/login']);
            return false;
          } else {
            return true;
          }
        }
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    login(email, password) {
      return this.httpClient.post(`${environment.api}admins/auth`, {
        'email' : email,
        'password': password
      });
    }

    loginUser(email, password) {
      return this.httpClient.post(`${environment.api}users/auth`, {
        'email' : email,
        'password': password
      });
    }

    changeCredentials(email, oldPassword, newPassword) {
      return this.httpClient.post(`${environment.api}admins/auth`, {
        'email' : email,
        'oldPassword': oldPassword,
        'newdPassword': newPassword,
      });
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/cpanel/login']);
    }

}
