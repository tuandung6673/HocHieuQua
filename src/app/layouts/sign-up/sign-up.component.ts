import { ApiService } from 'src/services/api.service.service';
import { Account } from './../../../models/account.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  account : Account = new Account()
  name: string
  phone: string
  email: string
  taikhoan: string
  password: string
  password2: string
  rules: boolean
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  convertPhoneToString(phoneNumber: string) {
    return '0' + phoneNumber
  }

  onSubmit() {
    const newRegister = {...this.account}

    newRegister.name = this.name;
    newRegister.phone = this.convertPhoneToString(this.phone);
    newRegister.email = this.email;
    newRegister.userName = this.taikhoan;
    newRegister.password = this.password;
    newRegister.status = 1;

    // console.log(newRegister);
    this.apiService.postAccountRegister(newRegister).subscribe((responseData) => {
      console.log(responseData.message);
    })
  }
  
}
