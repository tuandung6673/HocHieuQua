import { forkJoin } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';
import { Teacher } from 'src/models/teacher.model';
import { Course } from 'src/models/course.model';

@Component({
  selector: 'app-user-chi-tiet-gv',
  templateUrl: './user-chi-tiet-gv.component.html',
  styleUrls: ['./user-chi-tiet-gv.component.css']
})
export class UserChiTietGvComponent implements OnInit {

  detailTeacher : Teacher = new Teacher()
  courses : Course[] = []
  id: string
  constructor(private spinner: NgxSpinnerService, private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.getData()
    })
  }

  getData() {
    this.spinner.show()
    forkJoin([
      this.apiService.getTeacherById(this.id),
      this.apiService.getCourse(this.id),
    ]).subscribe((responseData) => {
      this.detailTeacher = responseData[0].data
      this.courses = responseData[1].data.data
      
      this.spinner.hide()
    })
  }

  

}
