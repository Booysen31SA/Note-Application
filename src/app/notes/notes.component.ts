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
      this.notes = data.results;
      if (data.success) {
      Swal.close();
      }
    });
}
onSelect(note: Note): void {
  this.selectedNote = note;
}

delete(id: string) {
  console.log(id['titleID']);
  alert(id['titleID']);
}
update(id: string) {
  console.log(id['titleID']);
  alert(id['titleID']);
}

}
