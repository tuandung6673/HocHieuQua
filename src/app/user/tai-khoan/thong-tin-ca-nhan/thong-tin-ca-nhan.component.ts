import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from './../../../../models/account.model';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

import * as queryString from 'querystring-es3';


@Component({
  selector: 'app-thong-tin-ca-nhan',
  templateUrl: './thong-tin-ca-nhan.component.html',
  styleUrls: ['./thong-tin-ca-nhan.component.scss']
})
export class ThongTinCaNhanComponent implements OnInit {
  
  username : any
  query = {
    userName: '',
    name: '',
    phone: '',
    email: '',
    identityNo: ''
  }
  info : Account = new Account()
  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAccount()
  }


  getAccount() {
    // const userId = JSON.parse(localStorage.getItem('userData')).id
    const username = JSON.parse(localStorage.getItem('userData')).username
    const queryParams = queryString.stringify({username: username})
    this.spinner.show()
    this.apiService.getAccountByUserName(queryParams).subscribe((response) => {
      this.info = response?.data
      this.spinner.hide()
    })
  }

  updateLocal() {
    const clone = {...JSON.parse(localStorage.getItem('userData'))}
    clone.name = this.info.name
    clone.phone = this.info.phone
    clone.email = this.info.email
    clone.identityNo = this.info.identityNo
    // localStorage.removeItem('userData')
    localStorage.setItem('userData', JSON.stringify(clone))
  }

  changeInfo() {
    this.spinner.show()
    this.apiService.updateAccountInfo(this.info).subscribe((response) => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', detail: response.data.messages, summary: 'Thông báo'})
        this.updateLocal()
        this.getAccount()
      } else {
        this.messageService.add({severity: 'error', detail: response.data.messages, summary: 'Thông báo'})
      }
      this.spinner.hide()
    })
  }

}
