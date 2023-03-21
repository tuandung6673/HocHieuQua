import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getNameCourse(name) {
    document.title = "Khóa học " + name;
  }

}
