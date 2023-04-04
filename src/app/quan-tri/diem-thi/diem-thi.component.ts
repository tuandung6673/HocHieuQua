import { Subject } from './../../../models/subject.model';
import { Classroom } from './../../../models/classroom.model';
import { finalize } from 'rxjs';
import * as queryString from 'querystring-es3';
import * as moment from 'moment'
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { TestUser } from 'src/models/testUser.model';

@Component({
  selector: 'app-diem-thi',
  templateUrl: './diem-thi.component.html',
  styleUrls: ['./diem-thi.component.scss']
})
export class DiemThiComponent implements OnInit {

  classOptions : any[] = [];
  subjectOptions : any[] = [];
  courseOptions = [];
  testUsers : TestUser[];
  query = {
    classId: '',
    courseId: '',
    filter: '',
    offSet: 0,
    pageSize: 5,
    subjectId: '',
    testCategoryId: '', 
    userId: ''
  }
  totalRecords: number;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    document.title = "Điểm thi"
  }

  ngOnInit(): void {
    this.getTestUser();
    this.getClassOption();
  }

  
  getTestUser() {
    this.spinner.show();
    const queryParams = queryString.stringify(this.query);
    this.apiService.getTestUser(queryParams)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      this.testUsers = response.data.data;
      this.testUsers.map(t => {
        t.createdDate = t.createdDate ? moment(t.createdDate).format('DD/MM/YYYY k:mm') : '';
        t.finishedDate = t.finishedDate ? moment(t.finishedDate).format('DD/MM/YYYY k:mm') : '';
        t.modifiedDate = t.modifiedDate ? moment(t.modifiedDate).format('DD/MM/YYYY k:mm') : '';
      })
      this.totalRecords = response.data.data.length;
    })
  }

  paginate(event) {
    this.query = {
      ...this.query,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getTestUser();
  }

  onSearch() {
    this.getTestUser();
  }

  onDeleteTestUser() {

  }

  getClassOption() {
    this.apiService.getClassroom().subscribe(response => {
      this.classOptions = response.data.data.map(c => {
        return {
          label: c.name,
          value: c.id
        }
      });
    })
  }

  getSubjectOption() {
    this.apiService.getSubject(0, 100, this.query.classId).subscribe(response => {
      this.subjectOptions = response.data.data.map(s => {
        return {
          label: s.name,
          value: s.id
        }
      })
    })
  }

  getCourseOption() {
    this.apiService.getCourse('', this.query.classId,0, 100, '',-1, -1, '', this.query.subjectId, 1).subscribe(response => {
      this.courseOptions = response.data.data.map(c => {
        return {
          label: c.name,
          value: c.id
        }
      })
    })
  }

}
