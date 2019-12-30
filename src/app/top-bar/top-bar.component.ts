import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { APIServiceService} from '../Services/apiservice.service';
import { User } from '../models/user';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  title = 'Note-Application';
  user: User;
  name: string;
  isFocused = false;
  results = [];

  constructor( private router: Router, private apiService: APIServiceService) { }

  ngOnInit() {
    this.getUser();
  }

  logOut() {
    this.router.navigateByUrl('/login');
    localStorage.clear();
  }
  profile() {
    this.router.navigateByUrl('/profile');
  }

  getUser() {
    this.apiService.getUser() .subscribe((data: any) => {
      this.user = data;
      this.name = data.results[0].firstName + ' ' + data.results[0].lastName;
    });
  }
}
