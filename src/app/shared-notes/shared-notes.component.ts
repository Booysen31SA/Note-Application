import { Component, OnInit } from '@angular/core';
import { APIServiceService} from '../Services/apiservice.service';
import { Note } from '../models/note';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { MessageService } from '../Services/message.service';

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
  note: Note;
  selectedNote: Note;
  createdNote: Note;
  searchID: string;
  ID: number;

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

  onSelect(note: Note): void {
    this.selectedNote = note;
    this.ID = note.ID;
  }

  search(id: any) {
  }

  create(id: any) {}

  delete(id: any) {}

  update(id: any) {}

  getNotes() {}

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
