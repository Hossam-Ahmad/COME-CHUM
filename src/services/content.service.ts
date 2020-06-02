import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class ContentService {

    public goToContact = false;
    public covers;

    constructor(
        private httpClient: HttpClient
    ) {}

    getHome() {
        return this.httpClient.get(`${environment.api}content/home`);
    }

    getServices(pageId) {
        return this.httpClient.get(`${environment.api}content/services/${pageId}`);
    }

    getService(serviceId) {
        return this.httpClient.get(`${environment.api}content/services/${serviceId}`);
    }

    updateService(data) {
        return this.httpClient.post(`${environment.api}content/services`, {
            data
        });
    }

    getAdvantages(pageId) {
        return this.httpClient.get(`${environment.api}content/advantages/${pageId}`);
    }

    getAdvantage(advantageId) {
        return this.httpClient.get(`${environment.api}content/advantages/advantage/${advantageId}`);
    }

    updateAdvantage(data) {
        return this.httpClient.post(`${environment.api}content/advantages`, {
            data
        });
    }

    getAbout() {
        return this.httpClient.get(`${environment.api}content/about`);
    }

    updateAbout(data) {
        return this.httpClient.post(`${environment.api}content/about`, {
            data
        });
    }

}
