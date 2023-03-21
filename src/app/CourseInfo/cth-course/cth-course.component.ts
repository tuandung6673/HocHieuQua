import { CourseSchedule } from './../../../models/courseSchedule.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cth-course',
  templateUrl: './cth-course.component.html',
  styleUrls: ['./cth-course.component.scss']
})
export class CthCourseComponent implements OnInit {

  id : string;
  coursesSchedule: CourseSchedule[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getCourseSchedule(this.id)
    }
  }

  getCourseSchedule(courseId: string) {
    this.apiService.getCourseSchedule(0, 1000, courseId).subscribe((responseData) => {
      // console.log(responseData.data.data);
      this.coursesSchedule = responseData.data.data
    })
  }

}
