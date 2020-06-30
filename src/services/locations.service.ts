import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class LocationsService {

    constructor(public httpClient: HttpClient,
                public router: Router
       ) {}

    getCountries(language) {
        return this.httpClient.get(`${environment.api}locations/countries/${language}`);
    }

    getCities(countryId, language) {
        return this.httpClient.get(`${environment.api}locations/cities/${countryId}/${language}`);
    }

    getCountry(countryId, language) {
        return this.httpClient.get(`${environment.api}locations/country/${countryId}/${language}`);
    }

    getCity(cityId, language) {
        return this.httpClient.get(`${environment.api}locations/city/${cityId}/${language}`);
    }

}
