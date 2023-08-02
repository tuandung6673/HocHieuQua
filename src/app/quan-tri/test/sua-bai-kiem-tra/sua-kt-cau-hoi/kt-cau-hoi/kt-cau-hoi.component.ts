import { Component, Input, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TestQuestionAnswer } from 'src/models/testQuestionAnswer.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-kt-cau-hoi',
  templateUrl: './kt-cau-hoi.component.html',
  styleUrls: ['./kt-cau-hoi.component.scss']
})
export class KtCauHoiComponent implements OnInit {
  @Input() questionType;
  @Input() answerList;
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
    console.log(this.answerList);
    
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

  toggleAns(answer) {
    answer.isCorrect = answer.isCorrect == 1 ? 0 : 1;
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
