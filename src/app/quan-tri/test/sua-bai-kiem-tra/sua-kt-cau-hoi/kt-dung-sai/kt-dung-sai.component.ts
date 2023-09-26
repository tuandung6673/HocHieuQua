import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import TinyMCE from 'src/common/constants/tiny.constant';
import { TestQuestionAnswer } from 'src/models/testQuestionAnswer.model';

@Component({
  selector: 'app-kt-dung-sai',
  templateUrl: './kt-dung-sai.component.html',
  styleUrls: ['./kt-dung-sai.component.scss']
})
export class KtDungSaiComponent implements OnInit {
  @Input() questionType;
  @Input() answerList;
  @Input() quizz;
  @Input() index;
  @Output() saveEditQuizz = new EventEmitter<any>();
  editorConfig = TinyMCE;
  commentSidebar : boolean = false;
  selectAns : any = new TestQuestionAnswer();
  selectComment : any;

  constructor() { }

  ngOnInit(): void {
  }


  saveComment() {
    this.selectAns.comment = this.selectComment;
    this.commentSidebar = false;
  }

  turnOffAllAnswer(answerList) {
    answerList.forEach(ans => {
      ans.isCorrect = 0;
    })
  }

  toggleAns(answer) {
    this.turnOffAllAnswer(this.answerList);
    answer.isCorrect = 1;
  }

  onSelectAnswer(answer) {
    this.selectAns = answer;
    this.selectComment = answer.comment;
  }

  saveEdit() {
    this.saveEditQuizz.emit({quizz: this.quizz, index: this.index})
  }
}
