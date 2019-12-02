import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { APIServiceService} from '../Services/apiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  fname: string;
  lname: string;
  model;
  date: {year: number, month: number};
  password: string;
  confirm: string;

  constructor(private apiService: APIServiceService) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this.apiService.getUser() .subscribe((data: any) => {
      this.user = data.results[0];
      this.fname = this.user.firstName;
      this.lname = this.user.lastName;
      this.model = this.user.dateOfBirth;
    });
  }
  updateProfile() {
    Swal.fire({
      title: 'Updating....',
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
    this.apiService.updateUser(this.user) . subscribe((data: any) => {
      if (data.success) {
        Swal.close();
        Swal.fire(
          'Updated!',
           data.message
        );
      } else {
        Swal.fire(
          'Failed!',
           data.message
        );
      }
   });
  }
}
