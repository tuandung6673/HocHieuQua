import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent implements OnInit {
  @Input() quiz : any
  constructor() { }

  ngOnInit(): void {
  }

}
