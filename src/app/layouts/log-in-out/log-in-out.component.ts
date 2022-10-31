import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from 'src/models/authentication.model';
import { AuthService } from 'src/services/authService.service';

@Component({
  selector: 'app-log-in-out',
  templateUrl: './log-in-out.component.html',
  styleUrls: ['./log-in-out.component.css']
})
export class LogInOutComponent implements OnInit {

  response: string
  userToken : string
  userData: Authentication
  username : string;
  password : string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const data = {
      username: this.username,
      password: this.password
    }
    
    this.authService.login(data).subscribe((responseData) => {
      this.userToken = responseData.data?.token
      this.userData = responseData.data
      
      if(this.userToken) {
        localStorage.setItem('userToken', this.userToken)
        localStorage.setItem('userData', JSON.stringify(this.userData))
      }
      
      if(responseData.status == 'success') {
        this.router.navigate(['/'])
      }
    })
  }

}
