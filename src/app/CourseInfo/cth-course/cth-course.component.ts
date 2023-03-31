import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { CourseSchedule } from './../../../models/courseSchedule.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import * as moment from 'moment';

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

  constructor(private apiService: ApiService, private route: ActivatedRoute, private spinner: NgxSpinnerService, private messageService: MessageService, private router: Router) { }

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
      this.coursesSchedule[0].tests.map(t => {
        t.deadlineDate = moment(t.deadlineDate).format('DD/MM/YYYY k:mm')
      })
      this.spinner.hide();
    })
  }

  showDialog(item: CourseSchedule) {
    // item.status = item.status == 1 ? true : false;
    this.editSchedule = {...item};
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

  // newCourse(courseScheduleId) {
  //   this.router.navigateByUrl([courseScheduleId + '/them-moi'])
  // }
}
