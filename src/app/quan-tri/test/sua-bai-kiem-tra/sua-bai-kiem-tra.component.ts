import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { Test } from 'src/models/test.model';
import * as moment from 'moment';
import { TestCourseSchedule } from 'src/models/testCourseSchedule.model';

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
  testCourseSchedule : TestCourseSchedule = new TestCourseSchedule();
  commentConfiguration : any;
  commentConfigList = [
    {
      from: -1,
      to: 24,
      comment: "Bài làm tệ quá, con cần hoàn thiện và chăm chỉ hơn nhé!",
      isFixed: false
    },
    {
      from: 25,
      to: 49,
      comment: "Bài làm không tốt lắm, con cần hoàn thiện và chăm chỉ hơn nhé!",
      isFixed: false
    },
    {
      from: 50,
      to: 69,
      comment: "Bài làm khá, còn một số chỗ sai, cần chú ý hơn. Chúc mừng con!",
      isFixed: false
    },
    {
      from: 70,
      to: 84,
      comment: "Bài làm tốt, Chúc mừng con. Hãy tiếp túc phát huy nhé!",
      isFixed: false
    },
    {
      from: 85,
      to: 100,
      comment: "Bài làm xuất sắc, chúc mừng con đã đạt được thành này. Hãy phát phát huy!",
      isFixed: false
    },
    {
      from: -1,
      to: 100,
      comment: "Chúc mừng con đã hoàn thành bài kiểm tra!",
      isFixed: true
    }
  ]
  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.courseId = params['courseId'];      
      this.id = params['id'];
      this.testId = params['testId']
    });
    if(this.id && this.id != 'them-moi' && !this.courseId) {
      this.getTest(this.id);
    } else if (this.courseId && this.testId) {
      this.getTest(this.testId);
    } else {
      document.title = "Thêm Bài kiểm tra";
      this.commentConfiguration = this.commentConfigList;
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
      this.test.deadlineDate = this.test.deadlineDate ? moment(this.test.deadlineDate).format('DD/MM/YYYY k:mm') : "";
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
    if(this.courseId) {
      this.router.navigate(['/quan-tri/khoa-hoc', this.id], {queryParams: {isBack: 1}})
    } else {
      this.router.navigate(['/quan-tri/bai-kiem-tra'])
    }
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
      deadlineData: moment(this.test.deadlineDate, 'DD/MM/YYYY k:mm').format('YYYY-MM-DD k:mm:ss') == "Invalid date" ? "" : moment(this.test.deadlineDate, 'DD/MM/YYYY k:mm').format('YYYY-MM-DD k:mm:ss'),
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
          // this.router.navigate(['/quan-tri/bai-kiem-tra'])
          if(this.id && this.courseId && !this.testId) {
            this.postTestCourseSchedule(response.data);
            this.router.navigate(['/quan-tri/khoa-hoc', this.id], {queryParams: {isBack: 1}})
          } else if (this.testId) {
            this.messageService.add({severity: 'success', summary: 'Thành công', detail: response.message});
            this.router.navigate(['/quan-tri/khoa-hoc', this.id], {queryParams: {isBack: 1}})
          } else {
            this.messageService.add({severity: 'success', summary: 'Thành công', detail: response.message});
            this.router.navigate(['/quan-tri/bai-kiem-tra'])
          }
        } else {
          this.messageService.add({severity: 'error', summary: 'Thất bại', detail: response.message});
        }
      })
    } else {
      this.messageService.add({severity: 'warn', summary: 'Thông báo', detail: 'Nhập tất cả trường Nhận xét'})
    }
  }

  postTestCourseSchedule(responseData) {
    const data : TestCourseSchedule = {
      ...this.testCourseSchedule,
      courseScheduleId: this.courseId,
      testId: responseData,
      // deadlineDate: this.test.deadlineDate == "Invalid date" ? null : moment(this.test.deadlineDate, 'DD/MM/YYYY k:mm').format('YYYY-MM-DD k:mm'),
      deadlineDate: moment(this.test.deadlineDate, 'DD/MM/YYYY k:mm').format('YYYY-MM-DD k:mm') == "Invalid date" ? "" : moment(this.test.deadlineDate, 'DD/MM/YYYY k:mm').format('YYYY-MM-DD k:mm')
    }
    this.apiService.postTestCourseSchedule(data).subscribe(res2 => {
      if(res2.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: res2.data.messages});
        // router đi đâu ?? 

      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: res2.data.messages});
      }
    })
  }
}
