import { Course } from './../../../models/course.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  id: string;
  editCourse: Course = new Course()
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
  }


  getNameCourse(name) {
    if(this.id && this.id != 'them-khoa-hoc'){
      document.title = "Khóa học " + name;
    } else {
      document.title = "Thêm khóa học"

    }
  }

  cancel() {

  }

  save() {
    
  }

}
