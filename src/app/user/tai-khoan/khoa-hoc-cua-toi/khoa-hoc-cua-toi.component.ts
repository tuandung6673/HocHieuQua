import { Course } from './../../../../models/course.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-khoa-hoc-cua-toi',
  templateUrl: './khoa-hoc-cua-toi.component.html',
  styleUrls: ['./khoa-hoc-cua-toi.component.css']
})
export class KhoaHocCuaToiComponent implements OnInit {

  myCourses : Course[] = [];

  constructor(
    private apiService : ApiService,
    private message : MessageService,
    private spinner : NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.getMyCourse()
  }

  getMyCourse() {
    const accountId = JSON.parse(localStorage.getItem('userData')).id
    this.spinner.show();
    this.apiService.getCourse('','',0,100,'',1,1,accountId,'').subscribe((response) => {
      if(response.status == 'success') {
        this.myCourses = response.data.data
      }

      this.spinner.hide()
    })
  }

}
