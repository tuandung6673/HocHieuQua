import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { RecruitCandidate } from './../../../../models/recruitCandidate.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../../services/api.service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';
import { finalize } from 'rxjs';

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
      this.getCandidate(this.id);
    }
  }

  getCandidate(id:string) {
    this.spinner.show();
    this.apiService.getRecruitCandidateById(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((response) => {
      if(response.status == 'success') {
        document.title = "Ứng viên " + response.data.name;
        this.editRecruitCandidate = response.data;
        this.editRecruitCandidate.applyDate = this.editRecruitCandidate.applyDate ? moment(this.editRecruitCandidate.applyDate).format('DD/MM/YYYY k:mm') : '';
        this.editRecruitCandidate.interviewDate = this.editRecruitCandidate.interviewDate ? moment(this.editRecruitCandidate.interviewDate).format('DD/MM/YYYY k:mm') : '';
        this.editRecruitCandidate.interviewPass = this.editRecruitCandidate.interviewPass == 1 ? true : false;
        this.editRecruitCandidate.status = this.editRecruitCandidate.status == 1 ? true : false;
      }
    })
  }

  onSubmit() {
    const data = {
      ...this.editRecruitCandidate,
      interviewPass: this.editRecruitCandidate.interviewPass == true ? 1 : 0,
      status: this.editRecruitCandidate.status == true ? 1 : 0,
      applyDate: moment(this.editRecruitCandidate.applyDate, 'DD-MM-YYYY k:mm:ss').format('YYYY-MM-DD k:mm:ss') == "Invalid date" ? "" : moment(this.editRecruitCandidate.applyDate, 'DD-MM/-YYYY k:mm:ss').format('YYYY-MM-DD k:mm:ss'),
      interviewDate: moment(this.editRecruitCandidate.interviewDate, 'DD-MM-YYYY k:mm:ss').format('YYYY-MM-DD k:mm:ss') == "Invalid date" ? "" : moment(this.editRecruitCandidate.interviewDate, 'DD-MM/-YYYY k:mm:ss').format('YYYY-MM-DD k:mm:ss'),
    }
    this.apiService.postRecruitCandidate(data).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'success', detail: response.message})
      }
      this.router.navigate(['/quan-tri/ung-vien'])
    })
  }

  cancel() {
    this.router.navigate(['/quan-tri/ung-vien'])
  }

}
