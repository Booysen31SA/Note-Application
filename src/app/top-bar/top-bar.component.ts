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

  constructor(private router: Router, private apiService: APIServiceService) { }

  items = [1,2,3,4,5,6,7,8]

  ngOnInit() {
    this.getUser();
  }

  logOut() {
    this.router.navigateByUrl('/login');
    localStorage.clear();
  }

  getUser() {
    this.apiService.getUser() .subscribe((data: any) => {
      this.user = data;
      this.name = data.results[0].firstName + ' ' + data.results[0].lastName;
    });
  }

  onFocus() {
      this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  selectItem(value) {
    this.results = [...this.results, value];
  }

  pressEnter(value) {
    // add value to result
  }
}
