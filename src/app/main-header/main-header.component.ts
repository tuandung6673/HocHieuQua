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
      {label: 'Thông tin cá nhân ', icon: 'pi pi-users', command: () => {
        this.router.navigate(['/tai-khoan/thong-tin-ca-nhan'])
      }},
      {label: 'Đổi mật khẩu', icon: 'pi pi-qrcode', command: () => {
        this.router.navigate(['tai-khoan/doi-mat-khau'])
      }},
      {label: 'Khóa học của tôi', icon: 'pi pi-book', command: () => {
        this.router.navigate(['tai-khoan/khoa-hoc-cua-toi'])
      }},
      {label: 'Kích hoạt khóa học', icon: 'pi pi-key', command: () => {
        this.router.navigate(['tai-khoan/kich-hoat-khoa-hoc'])
      }},
      {label: 'Quá trình học tập', icon: 'pi pi-chart-pie', command: () => {
        this.router.navigate(['tai-khoan/qua-trinh-hoc-tap'])
      }},
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
