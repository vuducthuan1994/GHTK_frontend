import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';
@Injectable()

export class MyProFileService {
    private BASE_URL: string = 'http://localhost:3000/users';
    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Authorization': this.authService.getToken()
    });

    constructor(private http: HttpClient, private authService: AuthService) { }

    updateUser(id, data) {
        return this.http.put(this.BASE_URL + `/${id}`, data, { headers: this.httpHeaders })
    }
}