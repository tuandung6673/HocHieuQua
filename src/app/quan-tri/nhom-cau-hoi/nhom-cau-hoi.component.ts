import { TestQuestionGroup } from './../../../models/testQuestionGroup.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nhom-cau-hoi',
  templateUrl: './nhom-cau-hoi.component.html',
  styleUrls: ['./nhom-cau-hoi.component.scss']
})
export class NhomCauHoiComponent implements OnInit {

  getTestQuestionGroups : TestQuestionGroup[] = [];
  totalRecords : number;
  params = {
    filter: '',
    offSet: 0,
    pageSize: 5,
    status: -1
  }
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    document.title = "Nhóm câu hỏi"
  }

  ngOnInit(): void {
    this.getTestQuestionGroup();
  }

  getTestQuestionGroup() {
    const queryParams = queryString.stringify(this.params);
    this.spinner.show();
    this.apiService.getTestQuestionGroup(queryParams).subscribe(response => {
      this.getTestQuestionGroups = response.data.data;
      this.totalRecords = response.data.recordsTotal;
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getTestQuestionGroup();
  }

  onDeleteTeacher(id) {

  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getTestQuestionGroup();

  }
}
