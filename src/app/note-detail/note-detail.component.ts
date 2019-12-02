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
    if (localStorage.getItem('userID') === '') {
      this.router.navigateByUrl('/login');
    } else {
      if (localStorage.getItem('flag') === 'true') {
        this.userCheck();
      }
      this.getNote();
    }
  }

  userCheck() {
    this.noteService.getTokenValue() .subscribe((data: any) => {
      if (data.message.token !== localStorage.getItem('Token')) {
        localStorage.setItem('flag', 'true');
        Swal.fire(
          'Warning!',
          'You have logged in elsewhere'
        );
        this.router.navigateByUrl('/login');
      }
    });
  }

  getNote(): void {
    Swal.fire({
      title: 'Loading....',
      onOpen: function () {
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
    const id = this.route.snapshot.paramMap.get('id');
    this.noteService.searchNote(id)
    .subscribe((data: any) => {
      const noteObj = new Note();
      this.note = data.results[0];
      Swal.close();
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
      window.location.reload();
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

addToFavorite(id: any) {

}
}
