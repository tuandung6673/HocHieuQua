// import { Test } from './../../../models/test.model';
import { Test } from 'src/models/test.model';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bai-kiem-tra',
  templateUrl: './bai-kiem-tra.component.html',
  styleUrls: ['./bai-kiem-tra.component.scss']
})
export class BaiKiemTraComponent implements OnInit {

  tests: Test[] = []
  isLoading: boolean = false
  search: string
  params = {
    offSet: 0,
    pageSize: 5,
    classId: '',
    filter: '',
    courseId: '',
    subjectId: '',
    testCategoryId: '',
    totalRecord: 0 
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTests()
  }

  getTests() {
    this.apiService.getTest(this.params.offSet, this.params.pageSize, this.params.filter, this.params.classId, this.params.courseId, this.params.subjectId, this.params.testCategoryId).subscribe((responseData) => {
      this.tests = responseData.data.data
      this.params = {
        ...this.params,
        totalRecord: responseData.data.recordsTotal
      }
    })
  }

  onSearch() {
    this.getTests()
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getTests()
  }

}
