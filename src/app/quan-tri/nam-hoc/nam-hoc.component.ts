import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3';
import { CourseYear } from 'src/models/courseYear.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-nam-hoc',
  templateUrl: './nam-hoc.component.html',
  styleUrls: ['./nam-hoc.component.scss']
})
export class NamHocComponent implements OnInit {
  yearList : CourseYear[] = []
  params = {
    status: -1,
    offSet: 0,
    pageSize: 20,
    filter: ''
  }
  constructor(
    private apiService: ApiService,
    private confirmationService : ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getCourseYear();
  }

  getCourseYear() {
    const queryParams = queryString.stringify(this.params);
    this.apiService.getCourseYear(queryParams).subscribe(response => {
      this.yearList = response.data.data;
    })
  }

  onSearch() {

  }
  deleteTest(id: string) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa Bài kiểm tra này?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteCourseYear(id).subscribe(response => {
          if(response.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'Thành công', detail: response.data.messages});
            this.yearList = this.yearList.filter(d =>d.id != id)
          } else {
            this.messageService.add({severity: 'error', summary: 'Thất bại', detail: response.data.messages})
          }
        })
      }
    })
  }

}
