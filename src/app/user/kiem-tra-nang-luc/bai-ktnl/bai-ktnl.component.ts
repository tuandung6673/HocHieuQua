import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Test } from 'src/models/test.model';
import { ApiService } from 'src/services/api.service.service';
import * as moment from 'moment'
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

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
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
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
      // this.countdownMM();
      // this.countdownSS();
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

}
