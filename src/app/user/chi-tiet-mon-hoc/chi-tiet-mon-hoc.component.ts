import { finalize, forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Course } from 'src/models/course.model';
import * as queryString from 'querystring-es3';

@Component({
  selector: 'app-chi-tiet-mon-hoc',
  templateUrl: './chi-tiet-mon-hoc.component.html',
  styleUrls: ['./chi-tiet-mon-hoc.component.scss']
})
export class ChiTietMonHocComponent implements OnInit {

  id : string
  detailCourse : Course = new Course()
  teacherName = []
  comments : any
  query = {
    accountId: '',
    courseId: ''
  }
  courseQuery = {
    fromAdmin: 0,
    accountId: null
  }
  accoundId = JSON.parse(localStorage.getItem('userData'))?.id || null;
  isPayment : boolean = true;
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getData()
  }

  getData() {
    const query = {...this.query}
    query.accountId = this.accoundId
    query.courseId = this.id
    const queryParams = queryString.stringify(query);

    const courseParams = {...this.courseQuery};
    courseParams.accountId = this.accoundId;
    const courseQueryParams = queryString.stringify(courseParams)

    this.spinner.show()
    forkJoin([
      this.apiService.getCourseById(this.id, courseQueryParams),
      this.apiService.getCourseRating(this.id),
      this.apiService.getCheckPayment(queryParams)
      // CheckPayment
    ])
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe((responseData) => {
      this.detailCourse = responseData[0].data
      this.teacherName = responseData[0].data.teachers.map((teacher) => {
        return teacher.name
      })
      // this.comments = responseData[1].data.data
      this.isPayment = responseData[2].data.valid
      this.spinner.hide()
    })
  }

}
