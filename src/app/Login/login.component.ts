import { Component, OnInit, Input } from '@angular/core';
import { UserLogin } from '../models/User-Login';
import { APIServiceService} from '../Services/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: string;
  password: string;
  user: UserLogin;

  token: string;
  constructor(private apiService: APIServiceService) { }

  submitted = false;

  ngOnInit() {
    this.user = new UserLogin();
    console.log(this.user, 'dvdsv');
  }

  submit(user) {
    this.apiService.getToken(user.userId, user.password) .subscribe((data: any) => {
      this.token = data['message']['token'];
      this.submitted = true;
    });
  }
  register() {
   alert('Register function coming soon');
  }
}
