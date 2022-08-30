import { forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Course } from 'src/models/course.model';

@Component({
  selector: 'app-chi-tiet-mon-hoc',
  templateUrl: './chi-tiet-mon-hoc.component.html',
  styleUrls: ['./chi-tiet-mon-hoc.component.css']
})
export class ChiTietMonHocComponent implements OnInit {

  id : string
  detailCourse : Course = new Course()
  teacherName = []
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getData()
  }

  getData() {
    this.spinner.show()
    forkJoin([
      this.apiService.getCourseById(this.id)
      // CheckPayment
      // CourseRating
    ]).subscribe((responseData) => {
      this.detailCourse = responseData[0].data
      this.teacherName = responseData[0].data.teachers.map((teacher) => {
        return teacher.fullName
      })

      this.spinner.hide()
    })
  }

}
