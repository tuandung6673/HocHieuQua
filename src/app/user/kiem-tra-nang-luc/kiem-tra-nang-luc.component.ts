import { Test } from './../../../models/test.model';
import { Subject } from './../../../models/subject.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Classroom } from 'src/models/classroom.model';
import { ApiService } from './../../../services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kiem-tra-nang-luc',
  templateUrl: './kiem-tra-nang-luc.component.html',
  styleUrls: ['./kiem-tra-nang-luc.component.css']
})
export class KiemTraNangLucComponent implements OnInit {

  classList : Classroom[] = [];
  subjectList : Subject[] = [];
  classId : any;
  subjectId : any;
  tests : any[] = [];
  constructor(
    private apiService: ApiService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getClassroom()
  }

  getClassroom() {
    this.spinner.show()
    this.apiService.getClassroom().subscribe((response) => {
      if(response.status == 'success') {
        this.classList = response.data.data
        this.spinner.hide()
      }
    })
  }

  getSubject(classId) {
    this.spinner.show()
    this.apiService.getSubject(0, 100, classId).subscribe((response) => {
      if(response.status == 'success') {
        this.subjectList = response.data.data
        this.spinner.hide()
      }
    })
  }

  
  selectedClass(c) {
    this.classId = c.id
    this.subjectId = ''
    this.tests = []
    this.getSubject(c.id)
  }
  
  selectedSubject(s) {
    this.subjectId = s.id
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
