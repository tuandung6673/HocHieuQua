import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DetailAnswerComponent } from 'src/app/common/detail-answer/detail-answer.component';
import { Quizz } from 'src/models/quizz.model';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.scss']
})
export class DetailQuestionComponent implements OnInit {
  @ViewChild(DetailAnswerComponent) childComponent : DetailAnswerComponent
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
    // console.log('Số câu đúng: ',this.rightNumber);
    // console.log(this.childComponent.getData());
    // console.log(this.quizzs.map);
    // this.quizzs.map(item => {
    //   console.log(JSON.parse(item.quizzConfigSets));
    // })
    this.quizzs.map(item => {
      console.log(item);
    });
    
  }

  sendData(data) {
    console.log(data);
  }

}
