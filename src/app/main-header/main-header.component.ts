import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from 'src/models/authentication.model';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  items : any
  userData: Authentication
  isToken: boolean = false
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isToken = localStorage.getItem('userToken') ? true : false
    this.userData = JSON.parse(localStorage.getItem('userData'))
    // console.log(this.userData);
    this.items = [
      {label: 'Quản trị', icon: 'pi pi-setting', command: () => {
        this.router.navigate(['/quan-tri'])
      }},
      {label: 'Thông tin cá nhân ', icon: 'pi pi-users'},
      {label: 'Khóa học của tôi', icon: 'pi pi-book'},
      {label: 'Quá trình học tập', icon: 'pi pi-chart-pie'},
      {label: 'Kích hoạt khóa học', icon: 'pi pi-key'},
      {
        separator:true
      },
      {label: 'Đăng xuất', icon: 'pi pi-sign-out', command: () => {
        this.logout()
      }},

    ]
  }

  logout() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    this.router.navigate(['/dang-nhap'])
  }

}
