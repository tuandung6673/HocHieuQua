import { ConfirmationService, MessageService } from 'primeng/api';
import { Guide } from './../../../models/guide.model';
import * as queryString from 'querystring-es3';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tro-giup',
  templateUrl: './tro-giup.component.html',
  styleUrls: ['./tro-giup.component.scss']
})
export class TroGiupComponent implements OnInit {

  guides : Guide[] = [];
  isLoading : boolean = false;
  query = {
    screen: '',
    offSet: 0,
    pageSize: 100,
    filter: ''
  }
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getGuides();
  }

  getGuides() {
    this.isLoading = true;
    this.spinner.show();
    const queryParams = queryString.stringify(this.query)
    this.apiService.getGuide(queryParams).subscribe((response) => {
      if(response.status == 'success') {
        this.guides = response.data.data;
      }
      this.spinner.hide();
      this.isLoading = false;
    })
  }

  onSearch() {
    this.getGuides();
  }

  confirmDeleteGuide(id) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa Hướng dẫn này?',
      accept: () => {
        this.deleteGuide(id)
      }
    })
  } 

  deleteGuide(id:string) { 
    this.spinner.show();
    this.apiService.deleteGuide(id).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Xóa hướng dẫn thành công'})
      } else {
        this.messageService.add({severity: 'success', summary: 'Unsuccessfully', detail: 'Xóa hướng dẫn thất bại'})
      }
      this.spinner.hide();
    })
  }

}
