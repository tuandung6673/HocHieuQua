import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { DetailAnswerComponent } from 'src/app/common/detail-answer/detail-answer.component';
import { Quizz } from 'src/models/quizz.model';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.scss']
})
export class DetailQuestionComponent implements OnInit, OnChanges {
  @ViewChild(DetailAnswerComponent) childComponent : DetailAnswerComponent
  rightNumber : number = 0;
  comment2 : any;
  listQuestion : any[] = [];
  @Input() quizzs : Quizz[] = [];
  @Input() comment; 
  @Output() postRq = new EventEmitter<any>();
  constructor(
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listQuestion = [...this.quizzs];
    console.log(this.quizzs);
       
  }
  displayBasic : boolean = false;
  sendTestUser() {
    this.confirmationService.confirm({
      message: 'Bạn chắc chắn muốn nộp bài không ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pointHandler();
        const pointPercent = (this.pointQuizz / this.totalPoint * 100).toFixed(0);
        this.comment2 = this.getComment(pointPercent);
        this.postRq.emit({
          comment: this.comment2,
          finishedDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          totalPoint: this.totalPoint,
          totalTruth : this.rightQuizz,
          totalTruthPoint: this.pointQuizz,
          totalWrong: this.quizzs.length - this.rightQuizz,
          isHaveEssay : this.quizzs.some(item => item.testQuestionTypeCode == 'tieu_luan'),
        })
        this.displayBasic = true;
      }
    })
  }

  getComment(pointPercent) {
    this.comment = JSON.parse(this.comment);
    for(const item of this.comment) {
      if(item.from < pointPercent && pointPercent < item.to) {
        return item.comment;
      }
    }
  }

  sendData(data) {
    let index = this.listQuestion.findIndex(item => item.id == data.id);
    this.listQuestion[index] = data;
    // if(index == -1) {
    //   this.listQuestion.push(data);
    // } else {
    // }
  }

  rightQuizz : number = 0;
  pointQuizz : number = 0;
  totalPoint : number = 0;
  pointHandler() {
    this.listQuestion.map(item => {
      if(item.isUserSelect) {
        this.rightQuizz = this.rightQuizz + 1;
        this.pointQuizz = this.pointQuizz + item.point
      }
      this.totalPoint = this.totalPoint + item.point
    })
  }

  exitResult() {
    this.displayBasic = false;
    this.router.navigate(['/kiem-tra-nang-luc'])
  }

  downloadResult() {
    // const templateElement = document.getElementById('your-template-id');
    // // console.log(templateElement);
    
    // html2canvas(templateElement).then((canvas) => {
    //   const image = canvas.toDataURL('image/png');
    //   const link = document.createElement('a');
    //   link.href = image;
    //   link.download = 'template.png';
    //   link.click();
    // });
  }
}
