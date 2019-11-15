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
      localStorage.setItem('Token', data.message.token);
    });
   }

   getAllNotes() {
    return this.http.get(this.url + 'notes/getAll/0/' + localStorage.getItem('userID'));
   }

   update(TitleInput: string, messageInput: string) {
     const body = JSON.stringify({Title: TitleInput,
                                  message: messageInput,
                                  });
     console.log(body, 'sdcsdcsdc');

     return this.http.post(this.url + 'notes/' + TitleInput, body);
   }

   delete(id: string) {
     //console.log(id);
     return this.http.delete(this.url + 'notes/delete/' + id);
  }
}
