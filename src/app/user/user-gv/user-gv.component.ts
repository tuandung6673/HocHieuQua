import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';
import { Teacher } from 'src/models/teacher.model';

@Component({
  selector: 'app-user-gv',
  templateUrl: './user-gv.component.html',
  styleUrls: ['./user-gv.component.css']
})
export class UserGvComponent implements OnInit {

  teachers : Teacher[] = []
  constructor(private spinner: NgxSpinnerService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTeachers()
  }

  getTeachers() {
    this.spinner.show()
    this.apiService.getTeacher().subscribe((responseData) => {
      this.teachers = responseData.data.data
      this.spinner.hide()
    })
  }

}
