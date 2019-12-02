import { Component, OnInit } from '@angular/core';
import { APIServiceService} from '../Services/apiservice.service';
import { Note } from '../models/note';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { MessageService } from '../Services/message.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  Title: string;
  message: string;
  p = 1;
  notes = [];
  note: Note;
  selectedNote: Note;
  createdNote: Note;
  searchID: string;
  ID: number;
  favorite: number;

  constructor(private apiService: APIServiceService, private router: Router, private messageService: MessageService) { }


  ngOnInit() {
    this.note = new Note();
    if (localStorage.getItem('userID') === '') {
      this.router.navigateByUrl('/login');
    } else {
      if (localStorage.getItem('flag') === 'true') {
        this.userCheck();
      }
      this.getNotes();
    }
  }

  userCheck() {
    this.apiService.getTokenValue() .subscribe((data: any) => {
      if (data.message.token !== localStorage.getItem('Token')) {
        localStorage.setItem('flag', 'true');
        alert('You have logged in elsewhere');
        this.router.navigateByUrl('/login');
      }
    });
  }
  getNotes() {
    Swal.fire({
      title: 'Getting Your Notes....',
      onOpen() {
        Swal.showLoading();
      }
    }).then(
      // tslint:disable-next-line: only-arrow-functions
      function() {},
      // handling the promise rejection
      function failed(isLoggIn) {
        if (isLoggIn === true) {
          console.log('I was closed by the timer');
        }
      }
    );
    this.apiService.getAllNotes() .subscribe((data: any) => {
      const noteObj = new Note();

      this.notes = data.results;
      if (data.success) {
        if (data.count === 0) {
          noteObj.Title = '*';
          noteObj.message = 'No Notes Available';
          this.notes.push(noteObj);
        }
        Swal.close();
      }
    });
}
onSelect(note: Note): void {
  this.selectedNote = note;
  this.favorite = note.favorite;
  this.ID = note.ID;
}


create(id: any) {
    id.userId = localStorage.getItem('userID');
    this.apiService.addNote(id) .subscribe((data: any) => {
      if (data.success) {
        Swal.fire(
          'Created!',
          'success'
        );
        this.getNotes();
      } else {
        Swal.fire(
          'Failed!',
          data.message,
          'error'
        );
        window.location.reload();
      }
    });
}

delete(id: any) {
    if (id.Title === '*') {
      Swal.fire(
        'Create a Note First!',
      );
  } else {
  this.apiService.delete(id.Title) .subscribe((data: any) => {
    if (data.success) {
      Swal.fire(
        'Deleted!',
        'success'
      );
      window.location.reload();
    } else {
      Swal.fire(
        'Failed!',
        data.message,
        'error'
      );
      window.location.reload();
    }
  });
}
}

update(id: any) {
  if (id.Title === '*') {
    Swal.fire(
      'Create a Note First!',
    );
} else {
    this.apiService.update(id.Title, id.message) .subscribe((data: any) => {
      if (data.success) {
        Swal.fire(
          'Updated!',
          'success'
        );
        window.location.reload();
      } else {
        Swal.fire(
          'Failed!',
          data.message,
          'error'
        );
        window.location.reload();
      }
    });
  }
}
 search(id: any) {
  this.notes = [];
  Swal.fire({
    title: 'Searching for your Note....',
    onOpen() {
      Swal.showLoading();
    }
  }).then(
    // tslint:disable-next-line: only-arrow-functions
    function() {},
    // handling the promise rejection
    function failed(isLoggIn) {
      if (isLoggIn === true) {
        console.log('I was closed by the timer');
      }
    }
  );
  this.apiService.searchNote(id.Title) .subscribe((data: any) => {
    const noteObj = new Note();
    this.notes = data.results;

    if (data.success) {
      if (data.count === 0) {
        noteObj.Title = '*';
        noteObj.message = 'No Notes Available';
        this.notes.push(noteObj);
      } else {
        this.messageService.add(data.count + ' Records Found for ' + data.results[0].Title);
      }
      Swal.close();
    } else {
      this.messageService.add(data.message);
      Swal.close();
    }
  });
 }
  addToFavorite() {
    Swal.fire({
      title: 'Loading....',
      onOpen() {
        Swal.showLoading();
      }
    }).then(
      // tslint:disable-next-line: only-arrow-functions
      function() {},
      // handling the promise rejection
      function failed(isLoggIn) {
        if (isLoggIn === true) {
          console.log('I was closed by the timer');
        }
      }
    );
    this.apiService.favorite(this.ID) .subscribe((data: any) => {
      this.favorite = data['favorite'];
      this.getNotes();
      Swal.close();
    });
  }

  getColor() {
    if (this.favorite == 1) {
      return 'red';
    } else {

      return 'white';
    }
  }
}
