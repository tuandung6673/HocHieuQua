import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TestQuestionAnswer } from 'src/models/testQuestionAnswer.model';

@Component({
  selector: 'app-kt-dien-vao-cho-trong',
  templateUrl: './kt-dien-vao-cho-trong.component.html',
  styleUrls: ['./kt-dien-vao-cho-trong.component.scss']
})
export class KtDienVaoChoTrongComponent implements OnInit {
  @Input() answerList;
  @Input() quizz;
  commentSidebar : boolean = false;
  Editor = ClassicEditor;
  selectComment : any;
  selectAns : any = new TestQuestionAnswer();
  answerSidebar : boolean = false;
  selectAnswer : any;

  constructor() { }

  ngOnInit(): void {
  }

  saveComment() {
    this.selectAns.comment = this.selectComment;
    this.commentSidebar = false;
  }

  saveAnswer() {
    this.selectAns.answer = this.selectAnswer;
    this.answerSidebar = false;
  }

  onSelectAnswer(answer) {
    this.selectAns = answer;
    this.selectComment = answer.comment;
    this.selectAnswer = answer.answer;
  }

  toggleAns(answer) {
    answer.isCorrect = answer.isCorrect == 1 ? 0 : 1;
  }

}
