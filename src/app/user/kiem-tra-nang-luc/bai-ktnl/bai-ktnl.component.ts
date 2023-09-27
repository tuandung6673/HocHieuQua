import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Test } from 'src/models/test.model';
import { ApiService } from 'src/services/api.service.service';
import * as moment from 'moment'
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { TestUser } from 'src/models/testUser.model';
import { MessageService } from 'primeng/api';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-bai-ktnl',
  templateUrl: './bai-ktnl.component.html',
  styleUrls: ['./bai-ktnl.component.scss']
})
export class BaiKtnlComponent implements OnInit {

  startTime : any;
  remainTime : any;
  remainMM : any;
  remainSS: any = 59;
  test : Test = new Test();
  id :string;
  testUser : TestUser = new TestUser();
  userId = JSON.parse(localStorage.getItem('userData'))?.userId;
  safeIframe: SafeHtml;
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageSerivce: MessageService,
    private domSanitizer : DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((param : Params) => {
      this.id = param['id']
    });
    this.getTestById();
    this.startTime = moment(new Date()).format('DD-MM-YYYY hh:mm:ss');
    // this.countdownMM();
    // this.countdownSS();
  }

  getTestById() {
    this.spinner.show();
    this.apiService.getTestById(this.id)
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe(response => {
      this.test = response.data;
      const desReplaced = this.test.description.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      this.safeIframe = this.domSanitizer.bypassSecurityTrustHtml(desReplaced);
    })
  }

  countdownMM() {
    this.remainMM = this.test.remainMinute - 1;
    setInterval(() => {
      this.remainMM = this.remainMM - 1
    }, 60000)
  }

  countdownSS() {
    setInterval(() => {
      this.remainSS = this.remainSS - 1;
      if(this.remainSS == -1) {
        this.remainSS = 59;
      }
    }, 1000)
  }

  savePost(evt) {
    const data = {
      ...this.testUser,
      comment: evt.comment,
      finishedDate: evt.finishedDate,
      testId: this.test.id,
      userId: this.userId,
      userAnswers: JSON.stringify(this.test),
      totalPoint: evt.totalPoint,
      totalTruth: evt.totalTruth,
      totalTruthPoint: evt.totalTruthPoint,
      totalWrong: evt.totalWrong,
      isHaveEssay: evt.isHaveEssay ? 1 : 0,
      isLastest: 0,
      id: localStorage.getItem('testCode'),
      isSendMail: false,
      isTestPass: evt.totalTruth > this.test.totalPointPass ? 1 : 0
    }
    this.apiService.postTestUser(data).subscribe(response => {
      if(response.status == 'success') {
        localStorage.removeItem('testCode');
        this.messageSerivce.add({severity: 'success', summary: 'Thông báo', detail: response.data.messages})
      } else {
        this.messageSerivce.add({severity: 'error', summary: 'Thông báo', detail: response.data.messages})
      }
    });
  } 

}
