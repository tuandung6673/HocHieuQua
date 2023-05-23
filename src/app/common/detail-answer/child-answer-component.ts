import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
  @Output() countRight = new EventEmitter<any>()
  selectedAnswer : any[] = [];
  countOfRightAnswer : number = 0;
  constructor() {
  }

  ngOnInit(): void {
    this.quizzConfigSets.map(item => {
      if(item.result) {
        this.countOfRightAnswer = this.countOfRightAnswer + 1;
      }
    })
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
      this.countRight.emit(true);
    } else {
      this.countRight.emit(false);
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
  @Output() countRight = new EventEmitter<any>()
  constructor() {

  }

  ngOnInit(): void {
    
  }

  chooseHandler(item) {
    if(item.result) {
      this.countRight.emit(true);
    } else {
      this.countRight.emit(false);
    }
  }
}

@Component({
  selector: 'app-nhieu-trinh-tha-don-xuong',
  styleUrls: ['./child-answer.scss'],
  template: `
  <div *ngFor="let answer of quizzConfigSets">
    <div class="child-answer">
      <p-dropdown [options]="answer.options" [(ngModel)]="answer.userChoose" optionValue="result" placeholder="Chọn đáp án" (onChange)="changeHanlder()"></p-dropdown>
    </div>
  </div>
  `
})
export class AppNhieuTrinhThaDonXuongComponent implements OnInit {
  @Input() quizzConfigSets;
  @Output() countRight = new EventEmitter<any>()
  answerOptions : any[] = [];

  ngOnInit(): void {
    this.quizzConfigSets.map(item => {
      item.answer = JSON.parse(item.answer);
    })
    this.quizzConfigSets = [...this.quizzConfigSets]
    this.quizzConfigSets.map(item => {
      item.userChoose = ""
      item.options = item.answer.data.map(item2 => {
        return {
          label: item2.answer,
          value: item2.id,
          result: item2.result
        }
      })
    })
  }

  changeHanlder() {
    if(this.quizzConfigSets.every(item => item.userChoose)) {
      this.countRight.emit(true);
    } else {
      this.countRight.emit(false);
    }
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
  @Output() countRight = new EventEmitter<any>()

  ngOnInit(): void {
  }

  chooseHandler(item) {
    if(item.result) {
      // console.log(`Câu ${this.quizz.order + 1} chọn đúng`);
      this.countRight.emit(true);
    } else {
      // console.log(`Câu ${this.quizz.order + 1} chọn sai`);
      this.countRight.emit(false);
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
  @Output() countRight = new EventEmitter<any>()
  @Input() quizz;
  ngOnInit(): void {
      
  }

  handlerAnswer(item) {
    if(this.value1 == item.quizzConfigSets.answer) {
      this.countRight.emit(true);
    } else {
      this.countRight.emit(false);
    }
  }
}

@Component({
  selector: 'app-dien-vao-nhieu-khoang-trong',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div *ngFor="let answer of cloneConfig">
      <div class="child-answer">
        <input type="text" pInputText [(ngModel)]="answer.userValue" (blur)="answer.userValue && inputHandler(answer)"> 
      </div>
    </div>
  `
})
export class AppDienVaoNhieuKhoangTrong implements OnInit {
  @Input() quizzConfigSets;
  @Output() countRight = new EventEmitter<any>()
  @Input() quizz;
  cloneConfig;
  ngOnInit(): void {
    this.quizzConfigSets.map(item => {
      item.answer = JSON.parse(item.answer);
    })
    this.cloneConfig = [...this.quizzConfigSets];
    this.cloneConfig.map(item => item.userValue = '');
  }

  inputHandler(answer) {
    const rightAnswer = answer.answer.data.filter(item => item.result == true);
    if(answer.userValue.trim() === rightAnswer[0].answer) {
      answer.isInputRight = true;
    } else {
      answer.isInputRight = false;
    }  
    this.checkResult(); 
  }

  checkResult() {
    if(this.cloneConfig.every(item => item.isInputRight)) {
      this.countRight.emit(true);
    } else {
      this.countRight.emit(false);
    }
  }
}

@Component({
  selector: 'app-phu-hop',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div *ngFor="let answer of quizzConfigSets" class="child-answer" style="display: flex; justify-content: space-between; align-items: center">
      <span>{{answer.answer.left}}</span>
      <span>
        <p-dropdown [options]="questionOptions" [(ngModel)]="answer.chooseValue" placeholder="Chọn đáp án" (onChange)="changeHandler()"></p-dropdown>
      </span>
    </div>
  `
})
export class AppPhuHopComponent implements OnInit {
  @Output() countRight = new EventEmitter<any>();
  @Input() quizzConfigSets : any;
  // cloneConfig : any[];
  questionOptions : any[] = []

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

    this.quizzConfigSets = [...this.quizzConfigSets];
    this.quizzConfigSets.map(item => {
      item.chooseValue = '';
    })
  }

  changeHandler() {
    if(this.quizzConfigSets.every(item => item.chooseValue == item.answer.right)) {
      this.countRight.emit(true);
    } else {
      this.countRight.emit(false);
    }
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
  content : string = '';
  ngOnInit(): void {
      
  }
}