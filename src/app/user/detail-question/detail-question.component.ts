import { Component, Input, OnInit } from '@angular/core';
import { Quizz } from 'src/models/quizz.model';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.scss']
})
export class DetailQuestionComponent implements OnInit {

  @Input() quizzs : Quizz[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
