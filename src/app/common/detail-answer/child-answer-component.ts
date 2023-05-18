import { Component, Input, OnInit } from "@angular/core";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
@Component({
  selector: 'app-nhieu-lua-chon',
  styleUrls: ['./child-answer.scss'],
  template: `
  <div *ngFor="let answer of quizzConfigSets">
    <div class="child-answer" style="display: flex">
      <input style="margin: 0" type="checkbox" id="answer.int_ord" (click)="chooseHanlder(answer)"/>
      <div style="margin-left: 10px">{{answer.answer}}</div>
    </div>
  </div>
  `
})
export class AppNhieuLuaChonComponent implements OnInit {
  @Input() quizzConfigSets : any;
  @Input() quizz;
  selectedAnswer : any[] = [];
  countOfRightAnswer : number = 0;
  constructor() {

  }

  ngOnInit(): void {
    console.log(this.quizzConfigSets);
    this.quizzConfigSets.map(item => {
      if(item.result) {
        this.countOfRightAnswer = this.countOfRightAnswer + 1;
      }
    })
    console.log(this.countOfRightAnswer);
    
  }

  chooseHanlder(item) {
    const index = this.selectedAnswer.indexOf(item);
    if(index == -1) {
      this.selectedAnswer.push(item);
    } else {
      this.selectedAnswer.splice(index, 1)
    }
    this.checkResult()
  }

  checkResult() {
    if(this.selectedAnswer.every(item => item.result) && this.selectedAnswer.length == this.countOfRightAnswer) {
      console.log(`Câu ${this.quizz.order + 1} chọn đúng`);
    } else {
      console.log(`Câu ${this.quizz.order + 1} chọn sai`);
    }
  }
}

@Component({
  selector: 'app-mot-lua-chon',
  styleUrls: ['./child-answer.scss'],
  template: `
  <div *ngFor="let answer of quizzConfigSets">
    <div class="child-answer" style="display: flex">
      <input style="margin: 0" type="radio" id="answer.int_ord" [name]="quizz.id" (click)="chooseHandler(answer)"/>
      <span style="margin-left: 10px" [innerHTML]="answer.answer"></span>
    </div>
  </div>
  `
})
export class AppMotLuaChonComponent implements OnInit {
  @Input() quizzConfigSets : any;
  @Input() quizz;
  constructor() {

  }

  ngOnInit(): void {
    
  }

  chooseHandler(item) {
    if(item.result) {
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
  <div *ngFor="let answer of quizzConfigSets">
    <div class="child-answer">
      <p-dropdown [options]="answerOptions" placeholder="Chọn đáp án"></p-dropdown>
    </div>
  </div>
  `
})
export class AppNhieuTrinhThaDonXuongComponent implements OnInit {
  @Input() quizzConfigSets;
  answerOptions : any[] = [];
  constructor() {
    
  }

  ngOnInit(): void {
    // Lỗiiiii (bị trùng options)
    this.quizzConfigSets.forEach(item => {
      const answer = JSON.parse(item.answer);
      this.answerOptions = answer.data.map(item2 => {
        return {
          label: item2. answer,
          value: item2.id
        }
      })
    })

    // this.answerOptions = JSON.parse(this.quizzConfigSets.answer).data.map((item) => {
    //   return {
    //     label: item.answer,
    //     value: item.id
    //   }
    // });
    
  }
}

@Component({
  selector: 'app-dung-sai',
  styleUrls: ['./child-answer.scss'],
  template: `
  <div *ngFor="let answer of quizzConfigSets">
    <div class="child-answer" style="display: flex">
      <input style="margin: 0" type="radio" id="answer.int_ord" [name]="quizz.id" (click)="chooseHandler(answer)"/>
      <span style="margin-left: 10px" [innerHTML]="answer.answer"></span>
    </div>
  </div>
  `
})
export class AppDungSaiComponent implements OnInit {
  @Input() quizzConfigSets;
  @Input() quizz;
  constructor() {

  }

  ngOnInit(): void {
    
  }

  chooseHandler(item) {
    if(item.result) {
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
  @Input() quizzConfigSets : any;
  @Input() quizz;
  ngOnInit(): void {
      
  }

  handlerAnswer(item) {
    if(this.value1 == item.quizzConfigSets.answer) {
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
    <div *ngFor="let answer of quizzConfigSets">
      <div class="child-answer">
        <input type="text" pInputText [(ngModel)]="value1"> 
      </div>
    </div>
  `
}) 
export class AppDienVaoNhieuKhoangTrong implements OnInit {
  value1:string;
  @Input() quizzConfigSets;
  ngOnInit(): void {
      
  }
}

@Component({
  selector: 'app-phu-hop',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div *ngFor="let answer of quizzConfigSets" class="child-answer" style="display: flex; justify-content: space-between; align-items: center">
      <span>{{answer.answer.left}}</span>
      <span>
        <p-dropdown [options]="questionOptions" [(ngModel)]="answer.answer.right" [placeholder]="answer.answer.left"></p-dropdown>
      </span>
    </div>
  `
})
export class AppPhuHopComponent implements OnInit {
  @Input() quizzConfigSets : any;
  questionOptions : any[] = []
  constructor() {}
  ngOnInit(): void { 
    this.quizzConfigSets.map(item => {
      item.answer = JSON.parse(item.answer)
    })

    this.quizzConfigSets.map(item => {
      this.questionOptions.push({
        label: item.answer.right,
        value: item.answer.right
      })
    })
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
  @Input() quizzConfigSets;
  Editor = ClassicEditor;
  content : string;
  ngOnInit(): void {
      
  }
}