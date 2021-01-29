import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';
@Injectable()

export class OrderService {
    private BASE_URL: string = 'http://localhost:3000/orders';

    private BASE_URL_PROVINCES = 'https://vapi.vnappmob.com/api/province/';
    private BASE_URL_DISTRICT = 'https://vapi.vnappmob.com/api/province/district';
    private BASE_URL_WARD =     'https://vapi.vnappmob.com/api/province/ward';

    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.authService.getToken()
    });

    constructor(private http: HttpClient, private authService: AuthService) { }

    updateUser(id, data) {
        return this.http.put(this.BASE_URL + `/${id}`, data, { headers: this.httpHeaders })
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
}