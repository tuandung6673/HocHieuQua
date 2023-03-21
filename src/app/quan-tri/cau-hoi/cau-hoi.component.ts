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
  testGroupParams = {
    filter: '',
    offSet: 0,
    pageSize: 1000,
    status: 1
  }
  testTypeParams = {
    filter: '',
    offSet: 0,
    pageSize: 1000
  }
  
  testQuestions : TestQuestion[] = [];
  totalRecord : number;
  testQuestionTypeOptions : any[] = [];
  testQuestionGroupOptions : any[] = [];
  levelOptions : any[] = [];
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    document.title = "Câu hỏi"
  }

  ngOnInit(): void {
    this.getTestQuestion();
    this.levelOptions = [
      {label: 'Tất cả', value: -1},
      {label: 'Dễ', value: 1},
      {label: 'Trung bình', value: 2},
      {label: 'Khó', value: 3},
      {label: 'Rất khó', value: 4},
    ];
    this.getTestQuestionGroupOptions();
    this.getTestQuestionTypeOptions();
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

  getTestQuestionTypeOptions() {
    const queryParams = queryString.stringify(this.testTypeParams)
    this.apiService.getTestQuestionType(queryParams).subscribe(response => {
      this.testQuestionTypeOptions = response.data.data.map(t => {
        return {
          label: t.name,
          value: t.code
        }
      })
    }) 
  }

  getTestQuestionGroupOptions() {
    const queryParams = queryString.stringify(this.testGroupParams)
    this.apiService.getTestQuestionGroup(queryParams).subscribe(response => {
      this.testQuestionGroupOptions = response.data.data.map(t => {
        return {
          label: t.name,
          value: t.id
        }
      })
    })
  }

  onSearch() {
    this.getTestQuestion();
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }    
    this.getTestQuestion();
  }
}
