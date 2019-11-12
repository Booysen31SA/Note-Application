import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/User-Login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(

  ) { }

  user = new UserLogin('MolleeC14ca', 'password');

  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }

  ngOnInit() {
  }

}
