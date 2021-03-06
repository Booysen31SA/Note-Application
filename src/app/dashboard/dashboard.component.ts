import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Note } from '../models/note';
import { APIServiceService} from '../Services/apiservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notes: Note[] = [];
  constructor(private apiService: APIServiceService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('userID') === '') {
      this.router.navigateByUrl('/login');
    } else {
      if (localStorage.getItem('flag') === 'true') {
        this.userCheck();
      }
      this.dashboardNotes();
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
         Swal.close();
    });
  }
}
