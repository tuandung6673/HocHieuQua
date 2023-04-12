import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as queryString from 'querystring-es3';
import { finalize } from 'rxjs';
import { Comment } from 'src/models/comment.model';
import { CourseSchedule } from 'src/models/courseSchedule.model';
import { Test } from 'src/models/test.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-chi-tiet-bai-hoc',
  templateUrl: './chi-tiet-bai-hoc.component.html',
  styleUrls: ['./chi-tiet-bai-hoc.component.scss']
})
export class ChiTietBaiHocComponent implements OnInit {
  courseId: string;
  testId: string;
  courseQuery = {
    accountId: null,
    fromAdmin: 0
  };
  courseSchedules : CourseSchedule[] = [];
  testDetail: Test = new Test();
  commentList : Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      this.courseId = params['id'];
      this.testId = params['testId'];
    })
  }

  ngOnInit(): void {
    this.getCourseDetail();
    this.getTestDetail();
    this.getComment();
  }

  getCourseDetail() {
    const courseQueryParams = queryString.stringify(this.courseQuery);
    this.spinner.show();
    this.apiService.getCourseById(this.courseId, courseQueryParams)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      this.courseSchedules = response.data.courseSchedules;
    })
  }

  getTestDetail() {
    this.spinner.show();
    this.apiService.getTestById(this.testId)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      this.testDetail = response.data;
    })
  }

  getComment() {
    this.apiService.getComment(this.testId)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      this.commentList = response.data.data;
    })
  }

  routerFunc(testId) {
    this.router.navigate(['/mon-hoc', this.courseId, testId]);
    setTimeout(() => {
      window.location.reload();
    }, 100)
  }

}
