import { ConfirmationService, MessageService } from 'primeng/api';
import * as queryString from 'querystring-es3';
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
    IsPayment: -1
  }
  paymentList : Payment[] = []

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private confimationService: ConfirmationService,
    private MessageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getPayment()
  }

  getPayment() {
    this.spinner.show();
    const queryParams = queryString.stringify(this.params);
    this.apiService.getPayment(queryParams).subscribe((response) => {
      this.paymentList = response.data.data;
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getPayment();
  }

}
