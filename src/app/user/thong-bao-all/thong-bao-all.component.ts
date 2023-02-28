import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/models/notification.model';

@Component({
  selector: 'app-thong-bao-all',
  templateUrl: './thong-bao-all.component.html',
  styleUrls: ['./thong-bao-all.component.scss']
})
export class ThongBaoAllComponent implements OnInit {

  params = {
    accountId: '', 
    filter: '',
    isRead: -1,
    offSet: 0,
    pageSize: 10,
  }
  listOfNoti : Notification[] = [];
  currentContent: any = null;
  currentLink : any = null;
  currentId : any = null;
  totalRecord : number;
  constructor(
    private apiService: ApiService,
    private spinner : NgxSpinnerService
  ) {
    
  }

  ngOnInit(): void {
    this.getNoti();
  }

  getNoti() {
    const queryParams = queryString.stringify(this.params);
    this.spinner.show();
    this.apiService.getNotification(queryParams).subscribe(response => {
      this.listOfNoti = response.data.data;
      this.totalRecord = response.data.recordsTotal;
      this.currentItem(response.data.data[0])
      this.spinner.hide();
    })
  }

  onSearch() {

  }

  currentItem(notee) {
    this.currentContent = notee.content;
    this.currentLink = notee.routerLink;
    this.currentId = notee.id;
  }
  
  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }    
    this.getNoti();
  }

}
