import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Test } from 'src/models/test.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3';

@Component({
  selector: 'app-sua-kt-cau-hoi',
  templateUrl: './sua-kt-cau-hoi.component.html',
  styleUrls: ['./sua-kt-cau-hoi.component.scss']
})
export class SuaKtCauHoiComponent implements OnInit, OnChanges {
  @Input() test : Test;
  isEdit : boolean = false;
  Editor = ClassicEditor;
  levelOptions = [
    {label: 'Dễ', value: 1},
    {label: 'Trung bình', value: 2},
    {label: 'Khó', value: 3},
    {label: 'Rất khó', value: 4},
  ];
  questionTypeOptions : any[] = [];
  questionGroupOptions : any[] = [];
  teacherOptions : any[] = [];

  quizzEdit : string;
  constructor(
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.getQuestionType();
    this.getQuestionGroup();
    this.getTeacher();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.test);
    
  }

  editQuizz(quizz) {
    this.quizzEdit = quizz.id;
    this.isEdit = true;
    console.log(JSON.parse(quizz.teacherIds));
    
  }

  getQuestionType() {
    const query = queryString.stringify({filter: '', offSet: 0, pageSize: 1000})
    this.apiService.getTestQuestionType(query).subscribe(response => {
      if(response.status === 'success') {
        this.questionTypeOptions = response.data.data.map(item => {
          return {
            label: item.name,
            value: item.code
          }
        })
      }
    })
  }

  getQuestionGroup() {
    const query = queryString.stringify({filter: '', offSet: 0, pageSize: 1000, status: 1});
    this.apiService.getTestQuestionGroup(query).subscribe(response => {
      if(response.status === 'success') {
        this.questionGroupOptions = response.data.data.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }
    })
  }

  getTeacher() {
    const queryParams = queryString.stringify({filter: '', offSet: 0, pageSize: 1000})
    this.apiService.getTeacher().subscribe(response => {
      if(response.status === 'success') {
        this.teacherOptions = response.data.data.map(item => {
          return {
            label: item.name,
            value: item.id
          }
        })
      }
    })
  }

}
