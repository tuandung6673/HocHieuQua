import * as queryString from 'querystring-es3';
import { TestQuestion } from './../../../models/testQuestion.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cau-hoi',
  templateUrl: './cau-hoi.component.html',
  styleUrls: ['./cau-hoi.component.scss']
})
export class CauHoiComponent implements OnInit {

  params = {
    filter: '',
    offSet: 0,
    level: -1,
    accountId: '',
    pageSize: 5,
    testQuestionGroupId: -1,
    testQuestionTypeCode: ''
  }
  testQuestions : TestQuestion[] = [];
  totalRecord : number;
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getTestQuestion();
  }

  getTestQuestion() {
    const queryParams = queryString.stringify(this.params);
    this.spinner.show();
    this.apiService.getTestQuestion(queryParams).subscribe(response => {
      this.testQuestions = response.data.data;
      this.totalRecord = response.data.recordsTotal;
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getTestQuestion();
  }
}
