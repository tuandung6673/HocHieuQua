import { finalize } from 'rxjs';
import * as queryString from 'querystring-es3';
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

  testUsers : TestUser[];
  query = {
    classId: '',
    courseId: '',
    filter: '',
    offSet: 0,
    pageSize: 10,
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
    })
  }

  onSearch() {
    this.getTestUser();
  }

  onDeleteTestUser() {

  }

}
