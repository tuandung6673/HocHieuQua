import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as queryString from 'querystring-es3';
import { CourseOverDeadline } from 'src/models/courseOverDeadline.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-diem-course',
  templateUrl: './diem-course.component.html',
  styleUrls: ['./diem-course.component.scss']
})
export class DiemCourseComponent implements OnInit {
  courseOver : CourseOverDeadline[] = []
  @Input() id : string
  query = {
    courseId: ''
  }
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getCourseOverDeadline();
  }

  getCourseOverDeadline() {
    this.query.courseId = this.id;
    const queryParams = queryString.stringify(this.query);
    this.apiService.getCourseOverDeadline(queryParams).subscribe(response => {
      this.courseOver = response.data.data;
      this.courseOver.map((t) => {
        t.deadlineDate = moment(t.deadlineDate).format('DD/MM/YYYY k:mm');
      })
    })
  }

}
