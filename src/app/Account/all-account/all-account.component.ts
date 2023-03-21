import * as queryString from 'querystring-es3';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/models/account.model';
import { ApiService } from 'src/services/api.service.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-all-account',
  templateUrl: './all-account.component.html',
  styleUrls: ['./all-account.component.scss']
})
export class AllAccountComponent implements OnInit {

  defaultAvatar = 'https://imgt.taimienphi.vn/cf/Images/tt/2020/7/15/anh-dai-dien-facebook-y-nghia-cho-con-trai-26.jpg'
  accounts : Account[] = []
  isLoading: boolean = false
  params = {
    offSet: 0,
    pageSize: 10,
    filter: '',
    roleId: ''
  }
  totalRecord : number
  roleParams = {
    offSet: 0,
    pageSize: 1000,
    filter: '',
  }
  roleOptions = [];
  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService, private spinner: NgxSpinnerService) {
    document.title = "Tài khoản"
  }

  ngOnInit() {
    this.getAllAccount();
    this.getRoldOption();
  }

  getAllAccount() {
    this.spinner.show();
    const queryParams = queryString.stringify(this.params)
    this.apiService.getAccounts(queryParams)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      // console.log('All account', this.accounts);
      this.accounts = responseData.data.data
      this.totalRecord = responseData.data.recordsTotal
      this.spinner.hide();
    })
  }

  onDeleteAccount(id: string) {
    this.apiService.deleteAccount(id).subscribe((responseData) => {
      console.log(responseData);
      this.accounts = this.accounts.filter(account => account.id != id)
    })
  }

  confirmDeleteAccount(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa giáo viên này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            this.onDeleteAccount(id)
        }
    });
  }

  onSearch() {
    this.getAllAccount();
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getAllAccount()
  }

  getRoldOption() {
    const queryParams = queryString.stringify(this.roleParams);
    this.apiService.getRoles(queryParams).subscribe(response => {
      this.roleOptions = response.data.data.map(role => {
        return {
          label: role.name,
          value: role.id
        }
      })
    })
  }

}
