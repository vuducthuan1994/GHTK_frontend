import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './login/model/user';
import { ServiceConfig } from '../../config/config';

@Injectable()
export class AuthService {
    private BASE_URL: string = `${ServiceConfig.host}/auth`;


    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    });
    constructor(private http: HttpClient) { }

    login(user: User): Observable<any> {
        let url: string = `${this.BASE_URL}/sign_in`;
        return this.http.post(url, user, { headers: this.httpHeaders });
    }
    register(user): Observable<any> {
        let url: string = `${this.BASE_URL}/register`;
        return this.http.post(url, user, { headers: this.httpHeaders });
    }

    getCurrentUser():  any{
        const currentUser =  JSON.parse(localStorage.getItem('currentUser'));
        console.log(currentUser);
        if (currentUser) {
           return currentUser;
        }
    }

    getToken() {
        if (localStorage.getItem('token')) {
            return localStorage.getItem('token');
        } 
    }
}