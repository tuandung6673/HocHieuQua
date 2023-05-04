import { ApiService } from 'src/services/api.service.service';
import { Account } from './../../../models/account.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
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
  type : string = 'password';
  type2: string = 'password';
  show : boolean = false;
  show2 : boolean = false;
  constructor(private apiService: ApiService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleEye() {
    this.show = !this.show;
    this.type = this.type == 'password' ? 'text' : 'password';
  }

  toggleEye2() {
    this.show2 = !this.show2;
    this.type2 = this.type2 == 'password' ? 'text' : 'password';
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
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: responseData.data.messages});
        this.router.navigate(['/dang-nhap'])
      } else {
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: responseData.data.messages});
      }
    })
  }
  
}
