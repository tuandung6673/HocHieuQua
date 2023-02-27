import * as queryString from 'querystring-es3';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Notification } from 'src/models/notification.model';

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
    private spinner: NgxSpinnerService
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

}
