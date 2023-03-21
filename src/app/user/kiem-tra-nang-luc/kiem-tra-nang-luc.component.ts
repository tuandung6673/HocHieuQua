import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kiem-tra-nang-luc',
  templateUrl: './kiem-tra-nang-luc.component.html',
  styleUrls: ['./kiem-tra-nang-luc.component.css']
})
export class KiemTraNangLucComponent implements OnInit {

  classList  = [];
  subjectList  = [{label: 'Tất cả', value: ''}];
  classId : any = '';
  subjectId : any = '';
  tests : any[] = [];
  constructor(
    private apiService: ApiService,
    private spinner : NgxSpinnerService
  ) {
    document.title = "Kiểm tra năng lực"
  }

  ngOnInit(): void {
    this.getClassroom();
    this.getTest()
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
    })
    this.spinner.hide();
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
    this.subjectId = '';
    this.getTest();
  }
  
  getTest() {
    this.spinner.show()
    this.apiService.getTest(0, 100, '', this.classId, '', this.subjectId, 'kiem-tra').subscribe((response) => {
      this.tests = response.data.data
      this.spinner.hide()
    })
  }
  
}
