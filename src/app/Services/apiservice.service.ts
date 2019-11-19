import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../Services/message.service';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  url = 'http://fatfree.local/';
  posts: any;
  token: string;
  userID: string;
  httpOptions;

  constructor(private http: HttpClient, private messageService: MessageService) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Accept: localStorage.getItem('Token')
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
     this.messageService.add('Message: Fetched All Notes');
     return this.http.get(this.url + 'notes/getAll/0/' + localStorage.getItem('userID'));
   }

   update(TitleInput: string, messageInput: string) {
     const body = JSON.stringify({Title: TitleInput,
                                  message: messageInput,
                                  });
     console.log(body, 'sdcsdcsdc');

     this.messageService.add('Message: ' + TitleInput + ' updated');
     return this.http.post(this.url + 'notes/' + TitleInput, body);
   }

   delete(id: string) {
    this.messageService.add('Message: ' + id + ' deleted');
    return this.http.delete(this.url + 'notes/delete/' + id);
  }

  searchNote(id: string) {
   this.messageService.add('Searching For ' + id );
   return this.http.get(this.url + 'notes/getByID/' + id);
  }

  addNote(note: any) {
    const body = JSON.stringify({userId: localStorage.getItem('userID'),
                                message: note.message,
                                Title: note.Title});
    this.messageService.add('Added Note ' + note.Title );
    return this.http.post(this.url + 'notes' , body);
  }
     dashboardNotes() {
      return this.http.get(this.url + 'dashboard/' + localStorage.getItem('userID'));
    }
}
