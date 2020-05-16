import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UsersService } from './users.service';
import { Observable, of } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class AuthUserService implements CanActivate {

  public userData = {
    name : '',
    id : '',
    image : '',
    email : '',
    cover : '',
    about : '',
    profile_id : '',
    token : ''
  };

  private interval = null;

    constructor(public httpClient: HttpClient,
                public router: Router,
                private users: UsersService,
                private socket: Socket
       ) {}

    isAuthenticated() {
        return localStorage.getItem('tokenUser') != null;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isAuthenticated()) {
          if (route.url.toString() === 'login' || route.url.toString() === 'activate' || route.url.toString() === 'forget' || route.url.toString() === 'register' || route.url.toString() === 'home') {
            this.router.navigate(['/feed']);
            return false;
          } else {
            return true;
          }
        } else {
            if (route.url.toString() !== 'login' && route.url.toString() !== 'activate' && route.url.toString() !== 'forget' && route.url.toString() !== 'register' && route.url.toString() !== 'faq' && route.url.toString() !== 'terms' && route.url.toString() !== 'home') {
            this.router.navigate(['/home']);
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
        return of(this.userData);
      } else {
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
      this.userData.profile_id = data.profile_id;
      this.userData.token = data.token;
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
        this.stopheartBeatOnline();
        this.router.navigate(['/login']);
        // this.httpClient.post(`${environment.api}users/logout`, {
        //   userId : this.userData.id,
        // }).subscribe( data => {
        // });
    }

    heartBeatOnline() {
      if (this.interval == null) {
          this.interval = setInterval(() => {
            if (this.userData.id !== '') {
              this.socket.emit('heartbeat' , { user_id : this.userData.id});
              // console.log('sent heart beat');
            }
          }, 5000);
      }
    }

    stopheartBeatOnline() {
      clearInterval(this.interval);
      this.interval = null;
    }

    getIpAddress() {
      return this.httpClient.get(`http://api.ipify.org/?format=json`);
    }

    getUnAuthentiated(token) {
      return this.httpClient.get(`${environment.api}users/unauthenticated/${token}`);
    }

    createUnAuthentiated(token) {
      return this.httpClient.post(`${environment.api}users/unauthenticated`, {
        token
      });
    }

}
