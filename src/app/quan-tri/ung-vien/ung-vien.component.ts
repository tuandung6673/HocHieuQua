import * as queryString from 'querystring-es3';
import { Component, OnInit } from '@angular/core';
import { RecruitCandidate } from './../../../models/recruitCandidate.model';
import { ApiService } from 'src/services/api.service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-ung-vien',
  templateUrl: './ung-vien.component.html',
  styleUrls: ['./ung-vien.component.scss']
})
export class UngVienComponent implements OnInit {

  query = {
    status: -1,
    interviewPass: -1,
    offSet: 0,
    pageSize: 10,
    filter: ''
  }
  candidates : RecruitCandidate[] = [];
  isLoading: boolean = false;
  interviewPassOptions : any[] = [];
  statusOptions:any[] = [];
  constructor(
    private apiService: ApiService,
    private spinner : NgxSpinnerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    document.title = "Ứng viên"
  }

  ngOnInit(): void {
    this.getCandidates();
    this.interviewPassOptions = [
      {label: 'Tất cả', value: -1},
      {label: 'Phỏng vấn đạt', value: 1},
      {label: 'Phỏng vấn trượt', value: 0}
    ];
    this.statusOptions = [
      {label: 'Tất cả', value: -1},
      {label: 'Đã phỏng vấn', value: 1},
      {label: 'Chưa phỏng vấn', value: 0}
    ]
  }

  getCandidates() {
    this.isLoading = true;
    this.spinner.show();
    const queryParams = queryString.stringify(this.query)
    this.apiService.getRecruitCandidate(queryParams).subscribe((response) => {
      if(response.status == 'success') {
        this.candidates = response.data.data;
      }
      this.spinner.hide();
      this.isLoading = false;
    })
  }

  onSearch() {
    this.getCandidates();
  }

  editCandidate(id:string) {
    console.log(id);
  }

  deleteCandidate(id:string) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa Ứng viên này không ?',
      accept: () => {
        this.apiService.deleteRecruitCandidate(id).subscribe(reponse => {
          if(reponse.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'success', detail: 'Xóa ứng viên thành công'});
            this.getCandidates();
          } else {
            this.messageService.add({severity: 'success', summary: 'success', detail: reponse.message})
          }
        })
      }
    })
  }

}
