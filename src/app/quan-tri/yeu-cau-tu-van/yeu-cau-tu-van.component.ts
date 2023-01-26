import * as queryString from 'querystring-es3';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Advice } from 'src/models/advice.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-yeu-cau-tu-van',
  templateUrl: './yeu-cau-tu-van.component.html',
  styleUrls: ['./yeu-cau-tu-van.component.scss']
})
export class YeuCauTuVanComponent implements OnInit {

  isLoading : boolean = false;
  adviceRequests : Advice[] = [];
  query = {
    offSet: 0,
    pageSize: 10,
    filter: ''
  }

  constructor(
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private confirmationService: ConfirmationService,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getAdvice();
  }

  getAdvice() {
    this.spinner.show();
    this.isLoading = true;
    const queryParams = queryString.stringify(this.query)
    this.apiService.getAdvice(queryParams).subscribe((response) => {
      if(response.status == 'success') {
        this.adviceRequests = response.data.data;
      }
      this.spinner.hide();
      this.isLoading = false;
    })
  }

  confirmDeleteAdviceRequest(id) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa Tư vấn này?',
      accept: () => {
        this.apiService.deleteAdvice(id).subscribe((response) => {
          this.messageService.add({severity:'success', summary:'Success', detail:response.message})
        })
      }
    })
  } 
}
