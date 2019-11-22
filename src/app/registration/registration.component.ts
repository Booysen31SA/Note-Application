import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { APIServiceService} from '../Services/apiservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor( private router: Router, private apiService: APIServiceService) { }

  ngOnInit() {
  }

  alreadyhaveaccount() {
    this.router.navigateByUrl('/login');
  }
}
