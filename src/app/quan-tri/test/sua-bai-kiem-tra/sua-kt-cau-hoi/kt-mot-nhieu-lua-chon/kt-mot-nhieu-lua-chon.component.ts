import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ConfirmationService } from 'primeng/api';
import { TestQuestionAnswer } from 'src/models/testQuestionAnswer.model';

@Component({
  selector: 'app-kt-mot-nhieu-lua-chon',
  templateUrl: './kt-mot-nhieu-lua-chon.component.html',
  styleUrls: ['./kt-mot-nhieu-lua-chon.component.scss']
})
export class KtMotNhieuLuaChonComponent implements OnInit {
  @Input() questionType;
  @Input() answerList;
  @Input() quizz;
  commentSidebar : boolean = false;
  answerSidebar : boolean = false;
  Editor = ClassicEditor;
  selectAns : any = new TestQuestionAnswer();
  selectComment : any;
  selectAnswer : any;
  constructor(
    private confirmationService: ConfirmationService
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
    console.log(answer.id);
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa câu trả lời này ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.answerList = this.answerList.filter(item => item.id != answer.id)
      }
    })
  }
}
