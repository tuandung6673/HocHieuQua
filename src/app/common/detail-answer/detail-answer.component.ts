import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quizz } from 'src/models/quizz.model';

@Component({
  selector: 'app-detail-answer',
  templateUrl: './detail-answer.component.html',
  styleUrls: ['./detail-answer.component.scss']
})
export class DetailAnswerComponent implements OnInit {
  @Input() quizz : Quizz;
  @Output() countRight = new EventEmitter<any>();
  quizzConfigSets : any;
  constructor() { }

  ngOnInit(): void {
    this.quizzConfigSets = JSON.parse(this.quizz.quizzConfigSets);
  }

  send123(value) {
    this.countRight.emit(value);
  }

  getData() {
    return this.quizz;
  }

}
