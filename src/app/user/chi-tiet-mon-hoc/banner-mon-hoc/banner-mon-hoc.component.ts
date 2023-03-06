import { Course } from 'src/models/course.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-banner-mon-hoc',
  templateUrl: './banner-mon-hoc.component.html',
  styleUrls: ['./banner-mon-hoc.component.scss']
})
export class BannerMonHocComponent implements OnInit {

  @Input() detailCourse : Course
  @Input() teacherName
  constructor() { }

  ngOnInit(): void {
    
  }


}
