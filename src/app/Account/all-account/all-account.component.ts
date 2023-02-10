import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Account } from 'src/models/account.model';
import { ApiService } from 'src/services/api.service.service';

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
    pageSize: 2,
    filter: '',
    RoleId: '',
    totalRecord: 0
  }
  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getAllAccount()
  }

  getAllAccount() {
    this.apiService.getAccounts(this.params.filter, this.params.offSet, this.params.pageSize, this.params.RoleId).subscribe((responseData) => {
      console.log('All account', this.accounts);
      this.accounts = responseData.data.data
      this.params.totalRecord = responseData.data.recordsTotal
      this.isLoading = false
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
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getAllAccount()
  }

}
