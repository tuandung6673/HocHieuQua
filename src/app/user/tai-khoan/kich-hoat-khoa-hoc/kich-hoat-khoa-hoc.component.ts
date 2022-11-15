import { Course } from './../../../../models/course.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kich-hoat-khoa-hoc',
  templateUrl: './kich-hoat-khoa-hoc.component.html',
  styleUrls: ['./kich-hoat-khoa-hoc.component.css']
})
export class KichHoatKhoaHocComponent implements OnInit {

  myActiveCourse : Course[] = []

  constructor(
    private apiService : ApiService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getActiveCourse()
  }

  getActiveCourse() {
    const accountId = JSON.parse(localStorage.getItem('userData')).id
    this.spinner.show();
    this.apiService.getCourse('','',0,100,'',1,0,accountId,'').subscribe((response) => {
      if(response.status == 'success') {
        this.myActiveCourse = response.data.data
      }
      this.spinner.hide()
    })
  }

}
