import { Component, Input, OnInit } from '@angular/core';
import { Quizz } from 'src/models/quizz.model';

@Component({
  selector: 'app-detail-answer',
  templateUrl: './detail-answer.component.html',
  styleUrls: ['./detail-answer.component.scss']
})
export class DetailAnswerComponent implements OnInit {
  @Input() quizz : Quizz;
  quizzConfigSets : any;
  constructor() { }

  ngOnInit(): void {
    this.quizzConfigSets = JSON.parse(this.quizz.quizzConfigSets);
    // console.log(this.quizzConfigSets);
  }

}
