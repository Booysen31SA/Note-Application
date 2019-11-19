import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Note } from '../models/note'
import { APIServiceService} from '../Services/apiservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notes: Note[] = [];
  constructor(private apiService: APIServiceService) { }

  ngOnInit() {
    this.dashboardNotes();
  }

  dashboardNotes() {
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
    this.apiService.dashboardNotes() .subscribe((data: any) => {

         // tslint:disable-next-line: forin
         for (let i in data.results) {
           this.notes.push(data.results[i].Title);
         }
         console.log(this.notes);
         Swal.close();
    });
  }
}
