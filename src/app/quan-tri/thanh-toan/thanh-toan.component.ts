import * as queryString from 'querystring-es3';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/models/payment.model';

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.scss']
})
export class ThanhToanComponent implements OnInit {

  params = {
    offSet: 0,
    pageSize: 5,
    filter: '',
    isPayment: -1
  }
  statusOptions = [
    {label: 'Tất cả', value: -1},
    {label: 'Chưa thanh toán', value: 0},
    {label: 'Đã thanh toán', value: 1}
  ]

  paymentList : Payment[] = [];
  totalRecord : number;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private confimationService: ConfirmationService,
    private messageService: MessageService
  ) {
    document.title = "Thanh toán";
  }

  ngOnInit(): void {
    this.getPayment()
  }

  getPayment() {
    this.spinner.show();
    const queryParams = queryString.stringify(this.params);
    this.apiService.getPayment(queryParams).subscribe((response) => {
      this.totalRecord = response.data.recordsTotal;
      this.paymentList = response.data.data;
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getPayment();
  }

  acceptPayment(id:string) {
    const query = {
      id: id,
      isPayment: 1,
      modifiedBy: ''
    }
    this.spinner.show();
    this.apiService.changePaymentStatus(query).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'success', detail: response.data.messages})
        this.getPayment();
      } else {
        this.messageService.add({severity: 'success', summary: 'success', detail: response.data.messages})

      }
      this.spinner.hide();
    })
  }

  declinePayment(id) {
    const query = {
      id: id,
      isPayment: 0,
      modifiedBy: ''
    }
    this.spinner.show();
    this.apiService.changePaymentStatus(query).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'success', detail: response.data.messages})
        this.getPayment();
      } else {
        this.messageService.add({severity: 'success', summary: 'success', detail: response.data.messages})
      }
      this.spinner.hide();
    })
  }

  deletePayment(id:string) {
    this.confimationService.confirm({
      acceptLabel: 'Xóa',
      rejectLabel: 'Hủy',
      message: 'Bạn có chắc chắn muốn xóa Thanh toán này?',
      accept: () => {
          this.spinner.show();
          this.apiService.deletePayment(id).subscribe(response => {
            if(response.status == 'success') {
              this.messageService.add({severity: 'success', summary: 'success', detail: response.data.messages})
              this.getPayment();
            } else {
              this.messageService.add({severity: 'success', summary: 'success', detail: response.data.messages})
            }
            this.spinner.hide();
        })
      }
    })
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getPayment();
  }
}
