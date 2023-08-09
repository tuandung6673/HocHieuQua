import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as queryString from 'querystring-es3';
import { Test } from 'src/models/test.model';
import { ApiService } from 'src/services/api.service.service';
@Component({
  selector: 'app-sua-kt-cau-hoi',
  templateUrl: './sua-kt-cau-hoi.component.html',
  styleUrls: ['./sua-kt-cau-hoi.component.scss']
})
export class SuaKtCauHoiComponent implements OnInit, OnChanges  {
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
  collabTeacher : any;
  quizzEdit : string;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getQuestionType();
    this.getQuestionGroup();
    this.getTeacher();
    // this.replaceDienVaoChoTrong();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  replaceDienVaoChoTrong() {
    this.test.quizzs.forEach(qz => {
      if(qz.testQuestionTypeCode === 'dien_vao_cho_trong') {
        // const contentElement = document.getElementById('content');
        qz.content = this.replaceSquareBracketsWithInput(qz.content);
        // console.log('content', qz.content);
        // contentElement.innerHTML = qz.content
      }
    })
  }

  editQuizz(quizz) {
    this.quizzEdit = quizz.id;
    this.isEdit = true;
    const teacher = JSON.parse(quizz.teacherIds)
    quizz.collabTeacher = teacher?.map(teacher => {
      return teacher.id
    });
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
    this.apiService.getTeacher().subscribe(response => {
      if(response.status === 'success') {
        this.teacherOptions = response.data.data.map(item => {
          return {
            name: item.name,
            id: item.id
          }
        })
      }
    })
  }

  saveEditQuizz(data) {
    let selectTeacher = []
    if(data.quizz.collabTeacher) {
      selectTeacher = data.quizz.collabTeacher.map(id => this.teacherOptions.find(tc => tc.id == id));
    }
    const data2 = {...data.quizz, teacherIds: JSON.stringify(selectTeacher), isAdd: 2};
    delete data2.collabTeacher;
    this.test.quizzs[data.index] = data2;
    this.isEdit = false;
    this.quizzEdit = '';
  }

  replaceSquareBracketsWithInput(text) {
    const regex = /\[(\d+)\]/g;
    const replacedText = text.replace(regex, (match, number) => {
      return `<span>
        <input type="text"/>
      </span>`
    })
    return replacedText
  }
}
