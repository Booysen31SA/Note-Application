import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  url = 'http://fatfree.local/';
  posts: any;
  token: string;

  constructor(private http: HttpClient) { }

  getToken(userIdInput: string, passwordInput: string ) {
    const body = JSON.stringify({userId: userIdInput,
                                 password: passwordInput});
    return this.http.post(this.url + 'auth', body);
   }
}
