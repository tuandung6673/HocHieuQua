import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Recruit } from 'src/models/recruit.model';
import { RecruitCandidate } from 'src/models/recruitCandidate.model';
import { ApiService } from './../../../../services/api.service.service';

@Component({
  selector: 'app-chi-tiet-tuyen-dung',
  templateUrl: './chi-tiet-tuyen-dung.component.html',
  styleUrls: ['./chi-tiet-tuyen-dung.component.scss']
})
export class ChiTietTuyenDungComponent implements OnInit {
  createDetailForm = this.formBuilder.group({
    recruitId: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required]),
    phone: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    content: new FormControl<string>(''),
  })
  recruitCandidate : RecruitCandidate = new RecruitCandidate()
  id: string
  isDisplayDialog: boolean = false
  detailRecruit : Recruit = new Recruit()
  isSubmit : boolean = false;
  constructor(private spinner: NgxSpinnerService, private apiService: ApiService, private route: ActivatedRoute, private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.createDetailForm.get('recruitId').setValue(this.id);
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

  onSubmit() {
    this.isSubmit = true;
    const data = {...this.recruitCandidate, ...this.createDetailForm.value};
    if(this.createDetailForm.valid) {
      data.phone = '0' + data.phone;   
      this.apiService.postRecruitCandidate(data).subscribe((response) => {
        if(response.status == 'success') {
          this.messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Ứng tuyển thành công'})
        } else {
          this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.message})
        }
        this.isDisplayDialog = false
      })
    } else {
      console.log(this.createDetailForm.get('name'));
      
      this.messageService.add({severity: 'error', summary: 'Thông báo', detail: 'Vui lòng điền đầy đủ thông tin'})
    }
  }
}
