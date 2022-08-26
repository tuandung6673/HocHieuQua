import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Course } from 'src/models/course.model';

@Component({
  selector: 'app-khoa-hoc',
  templateUrl: './khoa-hoc.component.html',
  styleUrls: ['./khoa-hoc.component.css']
})
export class KhoaHocComponent implements OnInit {

  courses: Course[] = []
  totalRecord: number = 0
  id: string
  constructor(private apiService: ApiService ,private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getCourse()
  }

  getCourse() {
    this.spinner.show()
    this.apiService.getCourse('', this.id).subscribe((responseData) => {
      console.log(responseData.data.data);
      this.courses = responseData.data.data
      this.totalRecord = responseData.data.recordsTotal
      this.spinner.hide()
    })
  }
}
