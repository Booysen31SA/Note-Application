import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { APIServiceService} from '../Services/apiservice.service';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  model;
  date: {year: number, month: number};

  constructor( private router: Router, private apiService: APIServiceService) { }

  ngOnInit() {
  }

  alreadyhaveaccount() {
    this.router.navigateByUrl('/login');
  }
}
