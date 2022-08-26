import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/models/course.model';

@Component({
  selector: 'app-khoa-hoc-gv',
  templateUrl: './khoa-hoc-gv.component.html',
  styleUrls: ['./khoa-hoc-gv.component.css']
})
export class KhoaHocGvComponent implements OnInit {

  @Input() course : Course
  constructor() { }

  ngOnInit(): void {
    
  }

}
