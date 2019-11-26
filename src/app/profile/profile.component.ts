import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { APIServiceService} from '../Services/apiservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  fname: string;
  lname: string;

  constructor(private apiService: APIServiceService) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this.apiService.getUser() .subscribe((data: any) => {
      this.user = data.results[0];
      this.fname = this.user.firstName;
      this.lname = this.user.lastName;
    });
  }
}
