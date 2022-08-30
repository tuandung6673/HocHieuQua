import { Course } from 'src/models/course.model';
import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-detail-mon-hoc',
  templateUrl: './detail-mon-hoc.component.html',
  styleUrls: ['./detail-mon-hoc.component.css']
})
export class DetailMonHocComponent implements OnInit, OnChanges {

  @Input() detailCourse: Course
  @Input() teacherName
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.teacherName = this.detailCourse.teachers.map((teacher) => {
      return teacher.fullName
    })    
  }

}
