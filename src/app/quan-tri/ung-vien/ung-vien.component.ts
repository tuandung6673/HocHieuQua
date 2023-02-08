import * as queryString from 'querystring-es3';
import { Component, OnInit } from '@angular/core';
import { RecruitCandidate } from './../../../models/recruitCandidate.model';
import { ApiService } from 'src/services/api.service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-ung-vien',
  templateUrl: './ung-vien.component.html',
  styleUrls: ['./ung-vien.component.scss']
})
export class UngVienComponent implements OnInit {

  query = {
    status: -1,
    interviewPass: -1,
    offSet: 0,
    pageSize: 10,
    filter: ''
  }
  candidates : RecruitCandidate[] = [];
  isLoading: boolean = false;
  constructor(
    private apiService: ApiService,
    private spinner : NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    this.isLoading = true;
    this.spinner.show();
    const queryParams = queryString.stringify(this.query)
    this.apiService.getRecruitCandidate(queryParams).subscribe((response) => {
      if(response.status == 'success') {
        this.candidates = response.data.data;
      }
      this.spinner.hide();
      this.isLoading = false;
    })
  }

}
