import { Course } from 'src/models/course.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-mon-hoc-left',
  templateUrl: './detail-mon-hoc-left.component.html',
  styleUrls: ['./detail-mon-hoc-left.component.css']
})
export class DetailMonHocLeftComponent implements OnInit {

  @Input() detailCourse: Course
  constructor() { }

  ngOnInit(): void {
  }

}
