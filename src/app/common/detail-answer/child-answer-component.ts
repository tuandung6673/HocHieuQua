import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-nhieu-lua-chon',
  template: `
    <div style="display: flex">
      <input style="margin: 0" type="checkbox" id="answer.int_ord"/>
      <div style="margin-left: 10px">{{answer.answer}}</div>
    </div>
  `
})
export class AppNhieuLuaChonComponent implements OnInit {
  @Input() answer : any;
  constructor() {

  }

  ngOnInit(): void {
    
  }
}

@Component({
  selector: 'app-mot-lua-chon',
  template: `
    <div style="display: flex">
      <input style="margin: 0" type="radio" id="answer.int_ord" name="same"/>
      <span style="margin-left: 10px" [innerHTML]="answer.answer"></span>
    </div>
  `
})
export class AppMotLuaChonComponent implements OnInit {
  @Input() answer : any;
  constructor() {

  }

  ngOnInit(): void {
      
  }
}

@Component({
  selector: 'app-nhieu-trinh-tha-don-xuong',
  template: `
    <div>
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
  template: `
    <div style="display: flex">
      <input style="margin: 0" type="radio" id="answer.int_ord" name="same"/>
      <span style="margin-left: 10px" [innerHTML]="answer.answer"></span>
    </div>
  `
})
export class AppDungSaiComponent implements OnInit {
  @Input() answer;
  constructor() {

  }

  ngOnInit(): void {
      
  }
}
