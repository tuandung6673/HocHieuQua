import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import TinyMCE from 'src/common/constants/tiny.constant';
import { TestQuestionAnswer } from 'src/models/testQuestionAnswer.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-kt-mot-nhieu-lua-chon',
  templateUrl: './kt-mot-nhieu-lua-chon.component.html',
  styleUrls: ['./kt-mot-nhieu-lua-chon.component.scss']
})
export class KtMotNhieuLuaChonComponent implements OnInit {
  @Input() questionType;
  @Input() answerList;
  @Input() quizz;
  @Input() index;
  @Output() saveEditQuizz = new EventEmitter<any>();
  editorConfig = TinyMCE;
  commentSidebar : boolean = false;
  answerSidebar : boolean = false;
  selectAns : any = new TestQuestionAnswer();
  selectComment : any;
  selectAnswer : any;
  newTestQuestionAnswer : TestQuestionAnswer = new TestQuestionAnswer();
  constructor(
  ) { }

  ngOnInit(): void {
  }

  onSelectAnswer(answer) {
    this.selectAns = answer;
    this.selectComment = answer.comment;
    this.selectAnswer = answer.answer;
  }

  saveComment() {
    this.selectAns.comment = this.selectComment;
    this.commentSidebar = false;
  }

  saveAnswer() {
    this.selectAns.answer = this.selectAnswer;
    this.answerSidebar = false;
  }

  // toggleAns(answer) {
  //   answer.isCorrect = answer.isCorrect == 1 ? 0 : 1;
  // }

  turnOffAllAnswer(answerList) {
    answerList.forEach(ans => {
      ans.isCorrect = 0;
    })
  }

  toggleAns(answer) {
    if(this.quizz.testQuestionTypeCode === 'mot_lua_chon') {
      this.turnOffAllAnswer(this.answerList);
      answer.isCorrect = 1;
    } else {
      answer.isCorrect = answer.isCorrect == 1 ? 0 : 1;
    }
  }

  deleteAnswer(answer) {
    this.quizz.testQuestionAnswers = this.quizz.testQuestionAnswers.filter(item => item.id != answer.id)
    // this.confirmationService.confirm({
    //   message: 'Bạn có muốn xóa câu trả lời này ?',
    //   header: 'Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.quizz.testQuestionAnswers = this.quizz.testQuestionAnswers.filter(item => item.id != answer.id)
    //   }
    // })
  }

  addAnswer() {
    const newAnswer = this.newTestQuestionAnswer;
    newAnswer.id = uuidv4(); 
    this.quizz.testQuestionAnswers = [...this.answerList, newAnswer];
  }

  saveEdit() {
    this.saveEditQuizz.emit({quizz: this.quizz, index: this.index})
  }
}
