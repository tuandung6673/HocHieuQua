import { NgxSpinnerService } from 'ngx-spinner';
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
    totalRecord: 0,
    IsShowInAbilityTest: -1
  }
  testCategoryOptions : any[] = [];
  classOptions : any[] = [];
  subjectOptions : any[] = [];
  IsShowInAbilityTestOption : any[] = []
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) {
    document.title = "Bài kiểm tra"
  }

  ngOnInit(): void {
    this.getTests();  
    this.testCategoryOptions = [
      {label: 'Tất cả', value: ''},
      {label: 'Kiểm tra', value: 'kiem-tra'},
      {label: 'Bài giảng', value: 'bai-giang'}
    ];
    this.IsShowInAbilityTestOption = [
      {label: 'Tất cả', value: -1},
      {label: 'Hiển thị', value: 1},
      {label: 'Ẩn', value: 0}
    ]
    this.getClassOptions();
  }

  getTests() {
    this.spinner.show();
    this.apiService.getTest(this.params.offSet, this.params.pageSize, this.params.filter, this.params.classId, this.params.courseId, this.params.subjectId, this.params.testCategoryId, this.params.IsShowInAbilityTest).subscribe((responseData) => {
      this.tests = responseData.data.data
      this.params = {
        ...this.params,
        totalRecord: responseData.data.recordsTotal
      }
      this.spinner.hide();
    })
  }

  getClassOptions() {
    this.apiService.getClassroom().subscribe(response => {
      this.classOptions = response.data.data.map(c => {
        return {
          label: c.name,
          value: c.id
        }
      })
    })
  }

  getSubjectOption() {
    this.apiService.getSubject(0, 1000, this.params.classId, '').subscribe(response => {
      this.subjectOptions = response.data.data.map(s => {
        return {
          label: s.name,
          value: s.id
        }
      })
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
