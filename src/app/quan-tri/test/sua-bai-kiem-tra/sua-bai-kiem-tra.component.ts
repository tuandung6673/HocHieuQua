import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { Test } from 'src/models/test.model';
import * as moment from 'moment';

@Component({
  selector: 'app-sua-bai-kiem-tra',
  templateUrl: './sua-bai-kiem-tra.component.html',
  styleUrls: ['./sua-bai-kiem-tra.component.scss']
})
export class SuaBaiKiemTraComponent implements OnInit {
  id: string = null;
  courseId : string = null;
  testId : string = null;
  test : Test = new Test();
  commentConfiguration : any;
  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      
      this.testId = params['testId']
      this.courseId = params['courseId'];      
      this.id = params['id'];
    });
    if(this.id && this.id != 'them-moi' && !this.courseId) {
      this.getTest(this.id);
    } else if (this.courseId && this.testId) {
      this.getTest(this.testId);
    } else {
      document.title = "Thêm Bài kiểm tra";
    }
  }

  getTest(id) {
    this.spinner.show();
    this.apiService.getTestById(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((response) => {
      document.title = "Bài kiểm tra " + response.data.name;
      this.test = response.data;
      this.commentConfiguration = JSON.parse(response.data.commentConfiguration);
      this.test.deadlineDate = moment(this.test.deadlineDate).format('DD/MM/YYYY k:mm')
      this.test.isShowInAbilityTest = response.data.isShowInAbilityTest == 1 ? true : false;
      this.test.isAutoSendMail = response.data.isAutoSendMail == 1 ? true : false;
      this.test.status = response.data.status == 1 ? true : false;
      this.test.isFree = response.data.isFree == 1 ? true : false;
      this.spinner.hide();
    })
  }

  // getData(newData : Test) {
  //   const data : Test = {
  //     ...newData,
  //     testCategoryId: newData.testCategoryCode,
  //     isShowInAbilityTest: newData.isShowInAbilityTest ? 1 : 0,
  //     isAutoSendMail: newData.isAutoSendMail ? 1 : 0,
  //     status: newData.status ? 1 : 0,
  //     isFree: newData.isFree ? 1 : 0,
  //   }
  //   console.log(data);
  // }

  cancel() {
    this.router.navigate(['/quan-tri/bai-kiem-tra'])
  }

  checkValidate(comment) : boolean {
    return comment.every(c => c.comment != '')
  }

  onSubmit() {
    const dataUpdate = {
      ...this.test,
      accountsSpecial: JSON.stringify([]),
      commentConfiguration: JSON.stringify(this.commentConfiguration),
      testCategoryId: this.test.testCategoryCode,
      isShowInAbilityTest: this.test.isShowInAbilityTest ? 1 : 0,
      deadlineDate : this.test.deadlineDate == "Invalid date" ? null : this.test.deadlineDate,
      isAutoSendMail: this.test.isAutoSendMail ? 1 : 0,
      status: this.test.status ? 1 : 0,
      isFree: this.test.isFree ? 1 : 0,
    }

    // console.log(dataUpdate);
    // console.log(this.checkValidate(this.commentConfiguration));

    if(this.checkValidate(this.commentConfiguration)) {
      this.spinner.show();
      this.apiService.postTest(dataUpdate)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        })
      )
      .subscribe((response) => {
        if(response.status == 'success') {
          this.spinner.hide();
          this.messageService.add({severity: 'success', summary: 'Thành công', detail: response.message});
          this.router.navigate(['/quan-tri/bai-kiem-tra'])
        } else {
          this.messageService.add({severity: 'error', summary: 'Thất bại', detail: response.message});
        }
      })
    } else {
      this.messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Nhập tất cả trường Nhận xét'})
    }
  }
}
