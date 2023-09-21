import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from './../../../../services/api.service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Recruit } from 'src/models/recruit.model';
import { EmailValidator } from '@angular/forms';
import { RecruitCandidate } from 'src/models/recruitCandidate.model';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-tuyen-dung',
  templateUrl: './chi-tiet-tuyen-dung.component.html',
  styleUrls: ['./chi-tiet-tuyen-dung.component.css']
})
export class ChiTietTuyenDungComponent implements OnInit {

  recruitCandidate : RecruitCandidate = new RecruitCandidate()
  name: string
  email: string
  phone: string
  note: string
  id: string
  isDisplayDialog: boolean = false
  detailRecruit : Recruit = new Recruit()

  constructor(private spinner: NgxSpinnerService, private apiService: ApiService, private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.getDetailRecruit()
    })
  }

  getDetailRecruit() {
    this.spinner.show()
    this.apiService.getRecruitById(this.id).subscribe((responseData) => {
      this.detailRecruit = responseData.data;
      this.detailRecruit.modifiedDate = moment(this.detailRecruit.modifiedDate).format('DD-MM-YYYY mm:hh')
      this.spinner.hide()
    })
  }

  onDisplayDialog() {
    this.isDisplayDialog = true
  }

  convertPhoneToString(phoneNumber: string) {
    return "0" + phoneNumber
  }

  onSubmit() {
    const data = {...this.recruitCandidate}
    data.recruitId = this.id,
    data.content = this.note,
    data.email = this.email,
    data.name = this.name,
    data.phone = this.convertPhoneToString(this.phone)
    
    this.apiService.postRecruitCandidate(data).subscribe((response) => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Ứng tuyển thành công'})
      } else {
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.message})
      }
      this.isDisplayDialog = false
    })
  }
}
