import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Course } from 'src/models/course.model';
import * as queryString from 'querystring-es3';

@Component({
  selector: 'app-chi-tiet-mon-hoc',
  templateUrl: './chi-tiet-mon-hoc.component.html',
  styleUrls: ['./chi-tiet-mon-hoc.component.css']
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
  accoundId = JSON.parse(localStorage.getItem('userData')).id;
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
    const queryParams = queryString.stringify(query)
    this.spinner.show()
    forkJoin([
      this.apiService.getCourseById(this.id),
      this.apiService.getCourseRating(this.id),
      this.apiService.getCheckPayment(queryParams)
      // CheckPayment
    ]).subscribe((responseData) => {
      this.detailCourse = responseData[0].data
      this.teacherName = responseData[0].data.teachers.map((teacher) => {
        return teacher.fullName
      })
      this.comments = responseData[1].data.data
      this.isPayment = responseData[2].data.valid
      this.spinner.hide()
    })
  }

}
