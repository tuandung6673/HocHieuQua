import { Course } from './../../../../models/course.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import * as queryString from 'querystring-es3';

@Component({
  selector: 'app-khoa-hoc-cua-toi',
  templateUrl: './khoa-hoc-cua-toi.component.html',
  styleUrls: ['./khoa-hoc-cua-toi.component.scss']
})
export class KhoaHocCuaToiComponent implements OnInit {

  myCourses : Course[] = [];
  query = {
    teacherId : '',
    classId: '',
    offSet: 0,
    pageSize: 100,
    filter: '',
    status: 1,
    isPayment: 1,
    accountId: '',
    subjectId: '',
    callFromAdmin: 1
  }
  constructor(
    private apiService : ApiService,
    private message : MessageService,
    private spinner : NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.getMyCourse()
  }

  getMyCourse() {
    const accountId = JSON.parse(localStorage.getItem('userData')).id
    this.spinner.show();
    const queryParams = queryString.stringify({
      ...this.query,
      accoundId: accountId
    })
    this.apiService.getCourse(queryParams).subscribe((response) => {
      if(response.status == 'success') {
        this.myCourses = response.data.data
      }
      this.spinner.hide()
    })
  }

}
