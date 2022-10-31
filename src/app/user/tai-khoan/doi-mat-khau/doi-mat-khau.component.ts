import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ApiService } from './../../../../services/api.service.service';
import { Component, OnInit } from '@angular/core';
import * as queryString from 'querystring-es3';

@Component({
  selector: 'app-doi-mat-khau',
  templateUrl: './doi-mat-khau.component.html',
  styleUrls: ['./doi-mat-khau.component.css']
})
export class DoiMatKhauComponent implements OnInit {

  // error: boolean 
  defaultAvatar : string = "https://hochieuqua7.web.app/images/menu/account.png"
  query = {
    userName: '',
    oldPassword: '',
    newPassword: ''
  }
  password2 : any
  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.query.userName = JSON.parse(localStorage.getItem('userData')).username
  }


  changePassword() {
    const queryParams = {...this.query}
    this.spinner.show()
    this.apiService.setAccountChangePassword(queryParams).subscribe(response => {
      if(response.status == 'success') {
        this.message.add({severity: 'success', summary: 'Thông báo', detail: response.data.messages})
      } else {
        this.message.add({severity: 'error', summary: 'Thông báo', detail: response.data.messages})
      }
      this.spinner.hide()
    })    
  }

}
