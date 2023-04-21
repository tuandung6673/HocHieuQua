import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Course } from 'src/models/course.model';
import { finalize } from 'rxjs';
import * as queryString from 'querystring-es3';

@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrls: ['./khoa-hoc.component.scss']
})
export class KhoaHocComponent implements OnInit {

  courses: Course[] = []
  totalRecord: number = 0
  id: string
  query = {
    accountId: '',
    callFromAdmin: 0,
    classId: '',
    filter: '',
    isPayment: -1,
    offSet: 0,
    pageSize: 10,
    status: -1,
    subjectId: '',
    teacherId: ''
  }
  constructor(private apiService: ApiService ,private route: ActivatedRoute, private spinner: NgxSpinnerService) {
    document.title = "Khóa học"
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getCourse()
  }

  getCourse() {
    const queryParams = queryString.stringify({
      ...this.query,
      classId: this.id
    })
    this.spinner.show()
    this.apiService.getCourse(queryParams)
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe((responseData) => {
      this.courses = responseData.data.data
      this.totalRecord = responseData.data.recordsTotal
    })
  }
}
