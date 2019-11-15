import { Component, OnInit } from '@angular/core';
import { APIServiceService} from '../Services/apiservice.service';
import { Note } from '../models/note';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private apiService: APIServiceService) { }

  notes = [];
  selectedNote: Note;

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
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
    this.apiService.getAllNotes() .subscribe((data: any) => {
      let noteObj = new Note();

      this.notes = data.results;
      if (data.success) {
        if (data.count === 0) {
          noteObj.Title = '*';
          noteObj.message = 'No Notes Available';
          this.notes.push(noteObj);
          console.log(this.notes);
        }
      Swal.close();
      }
    });
}
onSelect(note: Note): void {
  this.selectedNote = note;
}

delete(id: any) {
  //console.log(id);
  this.apiService.delete(id.Title) .subscribe((data: any) => {
    if (data.success) {
      Swal.fire(
        'Updated!',
        'success'
      );
      this.getNotes();
    } else {
      Swal.fire(
        'Failed!',
        data.message,
        'error'
      );
      this.getNotes();
    }
  });
}

update(id: any) {
  this.apiService.update(id.Title, id.message) .subscribe((data: any) => {
    if (data.success) {
      Swal.fire(
        'Updated!',
        'success'
      );
      this.getNotes();
    } else {
      Swal.fire(
        'Failed!',
        data.message,
        'error'
      );
      this.getNotes();
    }
  });
}

}
