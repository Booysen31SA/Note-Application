import { Component, OnInit } from '@angular/core';
import { APIServiceService} from '../Services/apiservice.service';
import { Note } from '../models/note';

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
    this.apiService.getAllNotes() .subscribe((data: any) => {
      this.notes = data.results;
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
