import { Component, OnInit } from '@angular/core';
import { APIServiceService} from '../Services/apiservice.service';
import { ShareNotes } from '../models/shareNotes';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { MessageService } from '../Services/message.service';
import { Note } from '../models/note';

@Component({
  selector: 'app-shared-notes',
  templateUrl: './shared-notes.component.html',
  styleUrls: ['./shared-notes.component.css']
})
export class SharedNotesComponent implements OnInit {

  Title: string;
  message: string;
  p = 1;
  notes = [];
  shareNotes: ShareNotes;
  selectedNote: Note;
  createdNote: ShareNotes;
  searchID: string;
  ID: number;

  constructor(private apiService: APIServiceService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.shareNotes = new ShareNotes();
    if (localStorage.getItem('userID') === '') {
      this.router.navigateByUrl('/login');
    } else {
      if (localStorage.getItem('flag') === 'true') {
        this.userCheck();
      }
      this.getNotes();
    }
  }

  onSelect(note: ShareNotes): void {
    this.selectedNote = note;
    this.ID = note.ID;
  }

  search(id: any) {
  }

  create(id: any) {}

  delete(id: any) {}

  update(id: any) {}

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
    this.apiService.getAllSharedNotes() .subscribe((data: any) => {
      const noteObj = new ShareNotes();

      if (data.success) {
        this.apiService.getAllNotes() .subscribe((Notedata: any) => {
          this.notes = Notedata.results;
        });
        if (data.count === 0) {
          noteObj.ID = 0;
          noteObj.admin = 'No Notes Available';
          this.notes.push(noteObj);
        }
        Swal.close();
      }
    });
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

}
