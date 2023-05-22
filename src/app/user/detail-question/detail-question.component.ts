import { Component, Input, OnInit } from '@angular/core';
import { Quizz } from 'src/models/quizz.model';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.scss']
})
export class DetailQuestionComponent implements OnInit {
  rightNumber : number = 0;
  @Input() quizzs : Quizz[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  countRight(value) {
    if(value == true) {
      this.rightNumber = this.rightNumber + 1;
    }
  }

  sendTestUser() {
    console.log('Số câu đúng: ',this.rightNumber);
    
  }

}
