import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  url = 'http://fatfree.local/';
  posts: any;
  token: string;
  userID: string;
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': localStorage.getItem('Token')
      })
    };
  }

  getToken(userIdInput: string, passwordInput: string ) {
    const body = JSON.stringify({userId: userIdInput,
                                 password: passwordInput});
    this.userID = userIdInput;
    localStorage.setItem('userID', this.userID);
    return this.http.post(this.url + 'auth', body);
   }

   getTokenValue() {
    const body = JSON.stringify({userId: this.userID});
    return this.http.post(this.url + 'auth/token', body).subscribe((data: any) => {
      localStorage.setItem('Token', data['message']['token']);
    });
   }

   getAllNotes() {
    //this.getTokenValue();

    // tslint:disable-next-line: prefer-const
    var token = localStorage.getItem('Token');
    const headers = new HttpHeaders({ testing: token});

    //console.log(headers);
    return this.http.get(this.url + 'notes/getAll/1');
   }
}
