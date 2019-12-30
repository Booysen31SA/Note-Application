import { Injectable, EmbeddedViewRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../Services/message.service';
import { User } from '../models/user';

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
    return this.http.post(this.url + 'auth/token', body);
   }

   getUser() {
     return this.http.get(this.url + 'user/' + localStorage.getItem('userID'));
   }

   updateUser(user) {
    const body = JSON.stringify({
                                   title: user.title,
                                   firstName: user.firstName,
                                   lastName: user.lastName,
                                   // tslint:disable-next-line: max-line-length
                                   gender: user.gender,
                                   mobileNumber: user.mobileNumber,
                                   telephoneNumber: user.telephoneNumber,
                                   email: user.email
    });
    return this.http.post(this.url + 'user/' + user.userId, body);
   }
   register(user: User) {
     const dateOdBirth = user.dateOfBirth['year'] + '-' + user.dateOfBirth['month'] + '-' + user.dateOfBirth['day'];
     const body = JSON.stringify({    password: user.password,
                                      title: user.title,
                                      firstName: user.firstName,
                                      lastName: user.lastName,
                                      // tslint:disable-next-line: max-line-length
                                      dateOfBirth: dateOdBirth,
                                      gender: user.gender,
                                      mobileNumber: user.mobileNumber,
                                      telephoneNumber: user.telephoneNumber,
                                      email: user.email
                                    });
     console.log(body);
     return this.http.post(this.url + 'user', body);
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
    favorite(id: number) {
      return this.http.get(this.url + 'notes/favorite/' + id);
    }

    getAllFavorites() {
      this.messageService.add('Message: Fetched All Favorite Notes');
      return this.http.get(this.url + 'notes/getFavorite/1/' + localStorage.getItem('userID'));
    }

    //share Notes
    getAllSharedNotes() {
      this.messageService.add('Message: Fetched All Notes');
      return this.http.get(this.url + 'share/getAll/0/' + localStorage.getItem('userID'));
    }

    createShareNote(userID: string, id: number, accessRights: string) {
      const body = JSON.stringify({	userId: userID,
                                    ID: id,
                                    admin: localStorage.getItem('userID'),
                                    accessRight: accessRights.trim()});
      console.log(accessRights.trim());
      return this.http.post(this.url + 'share', body);
    }
}
