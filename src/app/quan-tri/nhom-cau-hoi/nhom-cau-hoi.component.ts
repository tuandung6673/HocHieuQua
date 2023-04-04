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

  editGroupsQuestion : TestQuestionGroup = new TestQuestionGroup();
  newGroupsQuestion : TestQuestionGroup = new TestQuestionGroup();
  displayBasic: boolean = false;
  testQuestionGroups : TestQuestionGroup[] = [];
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
      this.testQuestionGroups = response.data.data;
      this.totalRecords = response.data.recordsTotal;
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getTestQuestionGroup();
  }

  onDeleteTestGroup(id) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa nhóm câu hỏi này?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteTestQuestionGroup(id).subscribe(response => {
          if(response.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'Thành công', detail: response.data.messages});
            this.testQuestionGroups = this.testQuestionGroups.filter(t => t.id != id);
          } else {
            this.messageService.add({severity: 'error', summary: 'Thất bại', detail: response.data.messages});
          }
        })
      }
    })
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getTestQuestionGroup();
  }

  showDialog(item : TestQuestionGroup) {
    this.editGroupsQuestion = {...item};
    this.editGroupsQuestion.status = this.editGroupsQuestion.status == '1' ? true : false;

    this.displayBasic = true;
  }

  postGroupsQuestion(item : TestQuestionGroup) {
    const updateData = {...item};
    updateData.status = updateData.status ? 1 : 0;

    this.apiService.postTestQuestionGroup(updateData).subscribe(reponse => {
      if(reponse.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: reponse.message});
        this.getTestQuestionGroup();
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: reponse.message})
      }
    })
  }

}
