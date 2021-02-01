import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import {ServiceConfig} from '../../../../config/config'
@Injectable()

export class OrderService {
    private BASE_URL_ORDER: string = `${ServiceConfig.host}/order`;

    private BASE_URL_PROVINCES = 'https://vapi.vnappmob.com/api/province/';
    private BASE_URL_DISTRICT = 'https://vapi.vnappmob.com/api/province/district';
    private BASE_URL_WARD =     'https://vapi.vnappmob.com/api/province/ward';

    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.authService.getToken()
    });
    
    constructor(private http: HttpClient, private authService: AuthService) { }

    sendOrder(data) : Observable<any>  {
        return this.http.post(`${this.BASE_URL_ORDER}/sendOrder`, data, { headers: this.httpHeaders })
    }
    checkOrder(filterOptions) : Observable<any>  {
        return this.http.post(`${this.BASE_URL_ORDER}/checkOrder`, filterOptions, { headers: this.httpHeaders })
    }
    getFee(body) : Observable<any> {
        return this.http.post(`${this.BASE_URL_ORDER}/getFee`, body, { headers: this.httpHeaders })
    }

    getProvinces() {
        return this.http.get(this.BASE_URL_PROVINCES,{headers : this.httpHeaders});
    }

    getDistrict(provinceID) {
        return this.http.get(`${this.BASE_URL_DISTRICT}/${provinceID}`,{headers : this.httpHeaders});
    }

    getWard(districtID) {
        return this.http.get(`${this.BASE_URL_WARD}/${districtID}`,{headers : this.httpHeaders});
    }

    getOrders(filterOptions) : Observable<any> {
        return this.http.post(`${this.BASE_URL_ORDER}/getOrders`,filterOptions, { headers: this.httpHeaders })

    }
}