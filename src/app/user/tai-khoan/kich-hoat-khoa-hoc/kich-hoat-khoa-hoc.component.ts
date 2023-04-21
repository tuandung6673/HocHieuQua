import { Course } from './../../../../models/course.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import * as queryString from 'querystring-es3';


@Component({
  selector: 'app-kich-hoat-khoa-hoc',
  templateUrl: './kich-hoat-khoa-hoc.component.html',
  styleUrls: ['./kich-hoat-khoa-hoc.component.scss']
})
export class KichHoatKhoaHocComponent implements OnInit {

  myActiveCourse : Course[] = []
  query = {
    teacherId : '',
    classId: '',
    offSet: 0,
    pageSize: 100,
    filter: '',
    status: 1,
    isPayment: 0,
    accountId: '',
    subjectId: '',
    callFromAdmin: 0
  }

  constructor(
    private apiService : ApiService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getActiveCourse()
  }

  getActiveCourse() {
    const accountId = JSON.parse(localStorage.getItem('userData')).id
    this.spinner.show();
    const queryParams = queryString.stringify({
        ...this.query,
        accountId: accountId
      }
    )
    this.apiService.getCourse(queryParams).subscribe((response) => {
      if(response.status == 'success') {
        this.myActiveCourse = response.data.data
      }
      this.spinner.hide()
    })
  }

}
