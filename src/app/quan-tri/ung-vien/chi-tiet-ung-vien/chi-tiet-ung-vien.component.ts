import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { RecruitCandidate } from './../../../../models/recruitCandidate.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../../services/api.service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-ung-vien',
  templateUrl: './chi-tiet-ung-vien.component.html',
  styleUrls: ['./chi-tiet-ung-vien.component.scss']
})
export class ChiTietUngVienComponent implements OnInit {

  Editor = ClassicEditor;
  editRecruitCandidate : RecruitCandidate = new RecruitCandidate();
  id : string;
  constructor(
    private apiService: ApiService,
    private spinner : NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getCandidate(this.id)
    }
  }

  getCandidate(id:string) {
    this.spinner.show();
    this.apiService.getRecruitCandidateById(id).subscribe((response) => {
      if(response.status == 'success') {
        this.editRecruitCandidate = response.data;
        this.editRecruitCandidate.interviewPass = this.editRecruitCandidate.interviewPass == 1 ? true : false;
        this.editRecruitCandidate.status = this.editRecruitCandidate.status == 1 ? true : false;
      }
      this.spinner.hide();
    })
  }

  onSubmit() {
    const data = {...this.editRecruitCandidate}
    data.interviewPass = data.interviewPass == true ? '1' : '0';
    data.status = data.status == true ? '1' : '0';
    this.apiService.postRecruitCandidate(data).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'success', detail: response.message})
      }
      this.router.navigate(['/quan-tri/ung-vien'])
    })
  }

}
