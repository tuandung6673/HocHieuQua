import { Component, Input, OnInit } from "@angular/core";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
@Component({
  selector: 'app-nhieu-lua-chon',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div class="child-answer" style="display: flex">
      <input style="margin: 0" type="checkbox" id="answer.int_ord" (click)="chooseHanlder(this)"/>
      <div style="margin-left: 10px">{{answer.answer}}</div>
    </div>
  `
})
export class AppNhieuLuaChonComponent implements OnInit {
  @Input() answer : any;
  @Input() quizz;
  constructor() {

  }

  ngOnInit(): void {
    
  }

  chooseHanlder(item) {
    
  }
}

@Component({
  selector: 'app-mot-lua-chon',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div class="child-answer" style="display: flex">
      <input style="margin: 0" type="radio" id="answer.int_ord" [name]="quizz.id" (click)="chooseHandler(this)"/>
      <span style="margin-left: 10px" [innerHTML]="answer.answer"></span>
    </div>
  `
})
export class AppMotLuaChonComponent implements OnInit {
  @Input() answer : any;
  @Input() quizz;
  constructor() {

  }

  ngOnInit(): void {
    
  }

  chooseHandler(item) {
    if(item.answer.result) {
      console.log(`Câu ${this.quizz.order + 1} chọn đúng`);
    } else {
      console.log(`Câu ${this.quizz.order + 1} chọn sai`);
    }
  }
}

@Component({
  selector: 'app-nhieu-trinh-tha-don-xuong',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div class="child-answer">
      <p-dropdown [options]="answerOptions" placeholder="Chọn đáp án"></p-dropdown>
    </div>
  `
})
export class AppNhieuTrinhThaDonXuongComponent implements OnInit {
  @Input() answer: any;
  answerOptions : any[] = [];
  constructor() {
    
  }

  ngOnInit(): void {
    this.answerOptions = JSON.parse(this.answer.answer).data.map((item) => {
      return {
        label: item.answer,
        value: item.id
      }
    });
    
  }
}

@Component({
  selector: 'app-dung-sai',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div class="child-answer" style="display: flex">
      <input style="margin: 0" type="radio" id="answer.int_ord" [name]="quizz.id" (click)="chooseHandler(this)"/>
      <span style="margin-left: 10px" [innerHTML]="answer.answer"></span>
    </div>
  `
})
export class AppDungSaiComponent implements OnInit {
  @Input() answer;
  @Input() quizz;
  constructor() {

  }

  ngOnInit(): void {
    
  }

  chooseHandler(item) {
    if(item.answer.result) {
      console.log(`Câu ${this.quizz.order + 1} chọn đúng`);
    } else {
      console.log(`Câu ${this.quizz.order + 1} chọn sai`);
    }
  }
}

@Component({
  selector: 'app-dien-vao-cho-trong',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div class="child-answer">
      <input type="text" pInputText [(ngModel)]="value1" (blur)="handlerAnswer(this)"> 
    </div>
  `
})
export class AppDienVaoChoTrongComponent implements OnInit {
  value1 : string; 
  @Input() answer : any;
  @Input() quizz;
  ngOnInit(): void {
      
  }

  handlerAnswer(item) {
    if(this.value1 == item.answer.answer) {
      console.log(`Câu ${this.quizz.order + 1} điền đúng`);
    } else {
      console.log(`Câu ${this.quizz.order + 1} điền sai`);
    }
  }
}

@Component({
  selector: 'app-dien-vao-nhieu-khoang-trong',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div class="child-answer">
      <input type="text" pInputText [(ngModel)]="value1"> 
    </div>
  `
}) 
export class AppDienVaoNhieuKhoangTrong implements OnInit {
  value1:string;
  @Input() answer;
  ngOnInit(): void {
      
  }
}

@Component({
  selector: 'app-phu-hop',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div class="child-answer" style="display: flex; justify-content: space-between; align-items: center">
      <span>{{question.left}}</span>
      <span>
        <p-dropdown [options]="this.questionOptions" [(ngModel)]="question.right" [placeholder]="question.left"></p-dropdown>
      </span>
    </div>
  `
})
export class AppPhuHopComponent implements OnInit {
  @Input() answer : any;
  @Input() quizzConfigSets : any;
  question : any;
  questionOptions : any[] = []
  ngOnInit(): void {
    this.quizzConfigSets.map(item => {
      const answer = JSON.parse(item.answer);
      this.questionOptions.push({
        label: answer.right,
        value: answer.right
      })  
    })
    this.question = JSON.parse(this.answer.answer);
  }
}

@Component({
  selector: 'app-tieu-luan',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div class="child-answer">
      <ckeditor [editor]="Editor" [(ngModel)]="content"></ckeditor>
    </div>
  `
})
export class AppTieuLuanComponent implements OnInit {
  @Input() answer;
  Editor = ClassicEditor;
  content : string;
  ngOnInit(): void {
      
  }
}