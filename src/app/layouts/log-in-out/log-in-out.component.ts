import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { delay } from 'rxjs';
import { Authentication } from 'src/models/authentication.model';
import { AuthService } from 'src/services/authService.service';

@Component({
  selector: 'app-log-in-out',
  templateUrl: './log-in-out.component.html',
  styleUrls: ['./log-in-out.component.scss']
})
export class LogInOutComponent implements OnInit, OnDestroy{

  response: string
  userToken : string
  userData: Authentication
  username : string;
  password : string;
  delay: any;
  show : boolean = false;
  constructor(private authService: AuthService, private router: Router, private message: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const data = {
      username: this.username,
      password: this.password
    }
    
    this.authService.login(data).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.userToken = responseData.data?.token
        this.userData = responseData.data

        localStorage.setItem('userToken', this.userToken)
        localStorage.setItem('userData', JSON.stringify(this.userData))

        this.message.add({summary: 'Thông báo', severity: 'success', detail: 'Đăng nhập thành công'})

        this.delay = setTimeout(() => {
          this.message.clear()
          this.router.navigate(['/'])
        }, 500);
      } else {
        this.message.add({summary: 'Thông báo', severity: 'error', detail: 'Đăng nhập thất bại'})
      }
      
    })
  }

  toggleEye() {
    this.show = !this.show;
  }

  ngOnDestroy(): void {
    clearTimeout(this.delay)
  }

}
