import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as queryString from 'querystring-es3';
import { Notification } from 'src/models/notification.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-thong-bao',
  templateUrl: './thong-bao.component.html',
  styleUrls: ['./thong-bao.component.scss']
})
export class ThongBaoComponent implements OnInit {

  params = {
    filter: '',
    isRead: -1,
    offSet: 0,
    pageSize: 5
  }
  adminNotifications : Notification[]=[];
  totalRecord : number;
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAdminNoti();
  }

  getAdminNoti() {
    const queryParams = queryString.stringify(this.params);
    this.spinner.show();
    this.apiService.getAdminNotification(queryParams).subscribe(response => {
      this.adminNotifications = response.data.data;
      this.totalRecord = response.data.recordsTotal;
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getAdminNoti()
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getAdminNoti();
  }

  onDeleteAccount(id: string) {
    this.apiService.deleteNotification(id).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: responseData.data.messages})
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.data.messages})
      }
      this.adminNotifications = this.adminNotifications.filter(account => account.id != id)
    })
  }

  confirmDeleteAccount(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa thông báo này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.onDeleteAccount(id)
        }
    });
  }


}
