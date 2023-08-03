import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as queryString from 'querystring-es3';
import { finalize } from 'rxjs';
import { ApiService } from 'src/services/api.service.service';
import { CourseSchedule } from './../../../models/courseSchedule.model';

@Component({
  selector: 'app-cth-course',
  templateUrl: './cth-course.component.html',
  styleUrls: ['./cth-course.component.scss']
})
export class CthCourseComponent implements OnInit {

  id : string;
  coursesSchedule: CourseSchedule[] = [];
  displayBasic : boolean = false;
  editSchedule : CourseSchedule = new CourseSchedule();
  newSchedule : CourseSchedule = new CourseSchedule();

  constructor(private apiService: ApiService, private route: ActivatedRoute, private spinner: NgxSpinnerService, private messageService: MessageService, private router: Router, private confimationService: ConfirmationService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getCourseSchedule(this.id)
    }
  }

  getCourseSchedule(courseId: string) {
    this.spinner.show();
    this.apiService.getCourseSchedule(0, 1000, courseId)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      this.coursesSchedule = responseData.data.data;
      // this.coursesSchedule[0].tests.map(t => {
      //   t.deadlineDate = moment(t.deadlineDate).format('DD/MM/YYYY k:mm')
      // })
      this.coursesSchedule.forEach((c) => {
        return c.tests.map(t => {
          t.deadlineDate = t.deadlineDate ? moment(t.deadlineDate).format('DD/MM/YYYY k:mm') : "";
        })
      })
      this.spinner.hide();
    })
  }

  showDialog(item: CourseSchedule) {
    // item.status = item.status == 1 ? true : false;
    // if(create) {
    //   this.editSchedule = {...this.editSchedule};
    // } else {
      // }
    this.editSchedule = {...item};
    this.editSchedule.courseId = this.id;
    this.editSchedule.status = this.editSchedule.status == 1 ? true : false;
    
    this.displayBasic = true;
  }

  postCourseSchedule(item : CourseSchedule) {
    const postItem = {...item};
    postItem.status = postItem.status ? 1 : 0;
    this.apiService.postCourseSchedule(postItem).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: response.message})
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: response.message})
      }
      this.getCourseSchedule(this.id)
    })
  }

  deleteCourseSchedule(item: CourseSchedule){
    this.confimationService.confirm({
      message: 'Bạn có muốn xóa Chương trình học này?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteCourseSchedule(item.id).subscribe(reponse => {
          if(reponse.status == 'success') {
            this.messageService.add({severity:'success', summary: 'Thành công', detail: reponse.data.messages});
            this.coursesSchedule = this.coursesSchedule.filter(c => c.id != item.id)
          } else {
            this.messageService.add({severity:'error', summary: 'Thất bại', detail: reponse.data.messages})
          }
        })
      }
    })
  }

  deleteTestCourseSchedule(courseId, testId) {
    const queryParams = queryString.stringify({testCourseScheduleId: courseId, testId: testId})
    this.confimationService.confirm({
      message: 'Bạn có chắc chắn xóa bài học này không?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteTestCourseSchedule(queryParams).subscribe(response => {
          if(response.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'Thành công', detail: response.data.messages});
            // this.getCourseSchedule();
            this.coursesSchedule.filter(c => c.id == courseId).map(t => {
              t.tests = t.tests.filter(x => x.id != testId);
            })
          } else {
            this.messageService.add({severity: 'error', summary: 'Thất bại', detail: response.data.messages})
          }
        })
      }
    })
  }

  // newCourse(courseScheduleId) {
  //   this.router.navigateByUrl([courseScheduleId + '/them-moi'])
  // }
}
