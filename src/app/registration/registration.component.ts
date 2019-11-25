import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { APIServiceService} from '../Services/apiservice.service';
import { User } from '../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User;
  model;
  date: {year: number, month: number};
  password: string;
  confirm: string;
  isContinue = true;

  constructor( private router: Router, private apiService: APIServiceService) { }

  ngOnInit() {
    this.user = new User();
  }

  submit() {
    this.Validation();
    console.log(this.isContinue);
    if (this.isContinue) {
      this.apiService.register(this.user) .subscribe((data: any) => {
        if (data.success) {
          Swal.fire(
            'Created!',
            'Your user ID is: ' + data.userId,
          );
          localStorage.setItem('userId', data.userId);
        } else {
          Swal.fire(
            'Failed!',
            data.message,
            'error'
          );
          this.router.navigateByUrl('/login');
        }
      });

    } else {
      Swal.fire('Please Fill out missing forms');
    }
  }
  Validation() {
    console.log(this.user);
    if (this.user.email === undefined) {
      this.isContinue = false;
    } else if (this.user.firstName === undefined) {
      this.isContinue = false;
    } else if (this.user.lastName === undefined) {
      this.isContinue = false;
    } else if (this.user.title === undefined) {
      this.isContinue = false;
    } else if (this.user.dateOfBirth === undefined) {
      this.isContinue = false;
    } else if (this.user.gender === undefined) {
      this.isContinue = false;
    } else if (this.user.mobileNumber === undefined) {
      this.isContinue = false;
    }
  }

  alreadyhaveaccount() {
    this.router.navigateByUrl('/login');
  }
}
