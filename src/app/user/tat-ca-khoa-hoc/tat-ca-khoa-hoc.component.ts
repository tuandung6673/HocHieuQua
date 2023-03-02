import * as queryString from 'querystring-es3';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Course } from 'src/models/course.model';

@Component({
  selector: 'app-tat-ca-khoa-hoc',
  templateUrl: './tat-ca-khoa-hoc.component.html',
  styleUrls: ['./tat-ca-khoa-hoc.component.scss']
})
export class TatCaKhoaHocComponent implements OnInit {

  classList  = [];
  subjectList  = [{label: 'Tất cả', value: ''}];
  classId : any = '';
  subjectId : any = '';
  params = {
    classId: '',
    filter: '',
    offSet: 0,
    pageSize: 10000,
    status: 1,
    subjectId: '' 
  }

  courses: Course[] = [];

  constructor(
    private apiService: ApiService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getClassroom();
    this.getCourse()
  }

  getClassroom() {
    this.spinner.show()
    this.apiService.getClassroom().subscribe((response) => {
      if(response.status == 'success') {
        this.classList = response.data.data.map(c => {
          return {
            label: c.name,
            value: c.id
          }
        })
        this.classList = [{label: 'Tất cả', value: ''}, ...this.classList]
      }
      this.spinner.hide();
    })
  }

  getSubject(classId) {
    this.spinner.show()
    this.apiService.getSubject(0, 100, classId).subscribe((response) => {
      if(response.status == 'success') {
        this.subjectList = response.data.data.map(s => {
          return {
            label: s.name,
            value: s.id
          }
        })
        this.subjectList = [{label: 'Tất cả', value: ''}, ...this.subjectList]
      }
      this.spinner.hide();
    })
    this.getCourse();
  }

  getCourse() {
    const queryParams = queryString.stringify(this.params);
    this.spinner.show();
    this.apiService.getCourseUser(queryParams).subscribe(response => {
      this.courses = response.data.data;
      this.spinner.hide();
    })
  }

}
