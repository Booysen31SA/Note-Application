import { Component, OnInit, Input } from '@angular/core';
import { UserLogin } from '../models/User-Login';
import { APIServiceService} from '../Services/apiservice.service';
import {Router} from '@angular/router';

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
  constructor(private apiService: APIServiceService, private router: Router) { }

  submitted = false;

  ngOnInit() {
    this.user = new UserLogin();
    console.log(this.user, 'dvdsv');
  }

  submit(user) {
    this.apiService.getToken(user.userId, user.password) .subscribe((data: any) => {
      this.isLoggIn = data['success'];

      if (this.isLoggIn) {
        this.token = data['message']['token'];
        this.submitted = true;
        this.router.navigateByUrl('/dashboard');

      } else {
        alert('invalid username or password');
      }
    });
  }
  register() {
   alert('Register function coming soon');
  }
}
