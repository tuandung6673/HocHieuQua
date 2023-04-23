import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3';
import { finalize } from 'rxjs';
import { Test } from 'src/models/test.model';
import { CourseSchedule } from 'src/models/courseSchedule.model';

@Component({
  selector: 'app-qua-trinh-hoc-tap',
  templateUrl: './qua-trinh-hoc-tap.component.html',
  styleUrls: ['./qua-trinh-hoc-tap.component.scss']
})
export class QuaTrinhHocTapComponent implements OnInit {

  myCourseOption : any[] = [];
  selectCourse : string = null;
  myStudyProcess : CourseSchedule[] = []
  processQuery = {
    courseId : '',
    accountId: null
  }
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getMyCourse();
    // this.getProcess();
  }

  getMyCourse() {
    this.spinner.show();
    this.apiService.getMyCourse()
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe(response => {
      this.myCourseOption = response.data.course.map(mc => {
        return {
          label: mc.name,
          value: mc.id
        }
      });
      this.myCourseOption = [...this.myCourseOption, {label: 'Kiểm tra năng lực', value: 'ability'}];
    })
  }

  getProcess() {
    this.processQuery.courseId = this.selectCourse;
    const queryParams = queryString.stringify(this.processQuery);
    this.spinner.show();
    this.apiService.getStudyProcess(queryParams)
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe(response => {
      this.myStudyProcess = response.data.data;
    })
  }
}
