import { Component, OnInit, Input } from '@angular/core';
import { UserLogin } from '../models/User-Login';
import { APIServiceService} from '../Services/apiservice.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import { empty } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: string;
  password: string;
  user: UserLogin;
  isLoggIn: false;
  token: string;
  recievedData = [];
  constructor(private apiService: APIServiceService, private router: Router) { }

  submitted = false;

  ngOnInit() {
    this.user = new UserLogin();
    this.userId = localStorage.getItem('userId');
    this.flagCheck();
  }
  flagCheck() {
    if (localStorage.getItem('flag') === 'true') {
      alert('You have logged in elsewhere');
    }
  }

  submit(user) {

    Swal.fire({
      title: 'Loading....',
      timer: 3000,
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
    this.apiService.getToken(user.userId, user.password) .subscribe((data: any) => {
      this.isLoggIn = data.success;

      if (this.isLoggIn) {
        localStorage.setItem('Token', data.message.token);
        this.token = data.message.token;
        this.recievedData = data;
        localStorage.setItem('Token', data.message.token);
        this.submitted = true;
        this.router.navigateByUrl('/dashboard');
        Swal.close();
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'User name or password is incorrect',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }


  register() {
    this.router.navigateByUrl('/registration');
  }
}
