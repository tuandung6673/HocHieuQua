import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
@Component({
  selector: 'app-nhieu-lua-chon',
  styleUrls: ['./child-answer.scss'],
  template: `
  <div *ngFor="let answer of quizz.testQuestionAnswers">
    <div class="child-answer" style="display: flex">
      <input style="margin: 0" type="checkbox" id="answer.int_ord" (click)="chooseHanlder(answer)"/>
      <div style="margin-left: 10px" [innerHTML]="answer.answer"></div>
    </div>
  </div>
  `
})
export class AppNhieuLuaChonComponent implements OnInit {
  @Input() quizz;
  @Output() countRight = new EventEmitter<any>()
  selectedAnswer : any[] = [];
  countOfRightAnswer : number = 0;
  constructor() {

  }

  ngOnInit(): void {
    this.quizz.testQuestionAnswers.map(item => {
      if(item.isCorrect == 1) {
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
    if(this.selectedAnswer.every(item => item.isCorrect == 1) && this.selectedAnswer.length == this.countOfRightAnswer) {
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
  <div *ngFor="let answer of quizz.testQuestionAnswers">
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
  @Output() countRight = new EventEmitter<any>();
  constructor() {

  }

  ngOnInit(): void {
    
  }

  chooseHandler(item) {
    if(item.isCorrect == 1) {
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
  <div *ngFor="let answer of quizz.testQuestionAnswers">
    <div class="child-answer">
      <p-dropdown [options]="answer.options" [(ngModel)]="answer.userChoose" optionValue="result" placeholder="Chọn đáp án" (onChange)="changeHanlder()"></p-dropdown>
    </div>
  </div>
  `
})
export class AppNhieuTrinhThaDonXuongComponent implements OnInit {
  @Input() quizzConfigSets;
  @Input() quizz;
  @Output() childDataChange = new EventEmitter<any>()
  @Output() countRight = new EventEmitter<any>();
  // quizzConfigSets : any[];
  answerOptions : any[] = [];

  ngOnInit(): void {
    this.quizz.testQuestionAnswers.map(item => {
      item.userChoose = ""
      item.options = item.childQuestionAnswers.map(item2 => {
        return {
          label: item2.answer,
          value: item2.id,
          result: item2.isCorrect
        }
      })
    })
  }

  changeHanlder() {
    if(this.quizz.testQuestionAnswers.every(item => item.userChoose == 1)) {
      this.childDataChange.emit(this.quizzConfigSets);
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
  <div *ngFor="let answer of quizz.testQuestionAnswers">
    <div class="child-answer" style="display: flex">
      <input style="margin: 0" type="radio" id="answer.int_ord" [name]="quizz.id" (click)="chooseHandler(answer)"/>
      <span style="margin-left: 10px" [innerHTML]="answer.answer"></span>
    </div>
  </div>
  `
})
export class AppDungSaiComponent implements OnInit {
  @Input() quizz;
  @Output() countRight = new EventEmitter<any>()

  ngOnInit(): void {
  }

  chooseHandler(item) {
    if(item.isCorrect == 1) {
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
    <!-- <div class="child-answer">
      <input type="text" pInputText [(ngModel)]="value1" placeholder="Điền..." (blur)="handlerAnswer(this)"> 
    </div> -->
  `
})
export class AppDienVaoChoTrongComponent implements OnInit {
  value1 : string; 
  @Input() quizzConfigSets : any;
  @Input() quizz;
  @Output() countRight = new EventEmitter<any>();
  ngOnInit(): void {
  }

  handlerAnswer(item) {
    const right = item.quizzConfigSets.filter(item => item.result == true)[0]
    if(this.value1 == right.answer) {
      // console.log(`Câu ${this.quizz.order + 1} điền đúng`);
      this.countRight.emit(true);
    } else {
      // console.log(`Câu ${this.quizz.order + 1} điền sai`);
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
  @Input() quizz;
  cloneConfig;
  @Output() countRight = new EventEmitter<any>()
  ngOnInit(): void {
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
      // console.log(`Câu ${this.quizz.order + 1} điền đúng`);
      this.countRight.emit(true);
    } else {
      // console.log(`Câu ${this.quizz.order + 1} điền sai`);
      this.countRight.emit(false);
    }
  }
}

@Component({
  selector: 'app-phu-hop',
  styleUrls: ['./child-answer.scss'],
  template: `
    <div *ngFor="let answer of quizz.testQuestionAnswers" class="child-answer" style="display: flex; justify-content: space-between; align-items: center">
      <span [innerHTML]="answer.answerLeft"></span>
      <span>
        <p-dropdown [options]="questionOptions" [(ngModel)]="answer.chooseValue" placeholder="Chọn đáp án" (onChange)="changeHandler()">
          <ng-template let-car pTemplate="item">
            <div class="ui-helper-clearfix" style="position: relative;height: 25px;">
              <div style="font-size:14px;margin-top:4px" [innerHTML]="car.label"></div>
            </div>
          </ng-template>
        </p-dropdown>
      </span>
    </div>
  `
})
export class AppPhuHopComponent implements OnInit {
  @Input() quizz
  @Output() countRight = new EventEmitter<any>();
  questionOptions : any[] = []

  ngOnInit(): void { 
    this.quizz.testQuestionAnswers.map(item => {
      this.questionOptions.push({
        label: item.answerRight,
        value: item.answerRight
      })
    })

    this.quizz.testQuestionAnswers.map(item => {
      item.chooseValue = '';
    })
  }

  changeHandler() {
    if(this.quizz.testQuestionAnswers.every(item => item.chooseValue == item.answerRight)) {
      this.countRight.emit(true);
      console.log('đúng');
    } else {
      this.countRight.emit(false);
      console.log('sai');
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
  Editor = ClassicEditor;
  content : string = '';
  ngOnInit(): void {
      
  }
}