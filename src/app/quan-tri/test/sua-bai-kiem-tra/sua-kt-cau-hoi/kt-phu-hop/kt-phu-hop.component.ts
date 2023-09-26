import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TinyMCE from 'src/common/constants/tiny.constant';
import { TestQuestionAnswer } from 'src/models/testQuestionAnswer.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-kt-phu-hop',
  templateUrl: './kt-phu-hop.component.html',
  styleUrls: ['./kt-phu-hop.component.scss']
})
export class KtPhuHopComponent implements OnInit {
  @Input() answerList;
  @Input() quizz;
  @Input() index;
  @Output() saveEditQuizz  = new EventEmitter<any>();
  editorConfig = TinyMCE;
  newTestQuestionAnswer : TestQuestionAnswer = new TestQuestionAnswer();
  commentSidebar : boolean = false;
  selectAns : any = new TestQuestionAnswer();
  selectComment : any;
  answerSidebar : boolean = false;
  selectAnswer : any;
  position : any;
  constructor() { }

  ngOnInit(): void {
  }

  // onSelectAnswer(answer) {
  //   this.selectAns = answer;
  //   this.selectComment = answer.comment;
  //   this.selectAnswer = answer.answer;
  // }

  answerEdit(answer) {
    this.selectAns = answer;
    this.answerSidebar  = true;
  }

  saveComment() {
    this.selectAns.comment = this.selectComment;
    this.commentSidebar = false;
  }

  editAnswer(answer, position) {
    this.position = position;
    if(position === 'left') {
      this.selectAnswer = answer.answerLeft;
    } else {
      this.selectAnswer = answer.answerRight;
    }
  }

  saveAnswer() {
    if(this.position === 'left') {
      this.selectAns.answerLeft = this.selectAnswer;
    } else {
      this.selectAns.answerRight = this.selectAnswer;
    }
    // this.selectAns.answer = this.selectAns.answerRight
    this.answerSidebar = false;
  }

  deleteAnswer(index) {
    this.answerList.splice(index, 1);
  }

  saveEdit() {
    this.saveEditQuizz.emit({quizz: this.quizz, index: this.index});
  }

  addAnswer() {
    const newAnswer = this.newTestQuestionAnswer;
    newAnswer.id = uuidv4(); 
    this.quizz.testQuestionAnswers = [...this.answerList, newAnswer];
  }

}
