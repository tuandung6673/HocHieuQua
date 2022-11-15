import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-man-hinh-dang-nhap',
  templateUrl: './man-hinh-dang-nhap.component.html',
  styleUrls: ['./man-hinh-dang-nhap.component.scss']
})
export class ManHinhDangNhapComponent implements OnInit {
  query = {
    username: '',
    password: ''
  }
  show : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  forgetPass() {
    // router
  }

  login() {

  }

  toggleEye() {
    this.show = !this.show
  }

}
