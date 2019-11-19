import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../models/note';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { MessageService } from '../Services/message.service';
import { APIServiceService} from '../Services/apiservice.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {

  @Input() note: Note;

  constructor(private route: ActivatedRoute,
              private noteService: APIServiceService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.getNote();
  }

  getNote(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.noteService.searchNote(id)
    .subscribe((data: any) => {
      const noteObj = new Note();
      this.note = data.results[0];
      console.log(data.results[0]);
    });
  }

  goBack(): void {
    this.location.back();
  }
  delete(id: any) {
    if (id.Title === '*') {
      Swal.fire(
        'Create a Note First!',
      );
  } else {
  this.noteService.delete(id.Title) .subscribe((data: any) => {
    if (data.success) {
      Swal.fire(
        'Deleted!',
        'success'
      );
      this.router.navigateByUrl('/notes');
    } else {
      Swal.fire(
        'Failed!',
        data.message,
        'error'
      );
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
    this.noteService.update(id.Title, id.message) .subscribe((data: any) => {
      if (data.success) {
        Swal.fire(
          'Updated!',
          'success'
        );
      } else {
        Swal.fire(
          'Failed!',
          data.message,
          'error'
        );
      }
    });
  }
}
}
