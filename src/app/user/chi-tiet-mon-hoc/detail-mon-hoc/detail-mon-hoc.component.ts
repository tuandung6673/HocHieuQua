import { ApiService } from 'src/services/api.service.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Advice } from './../../../../models/advice.model';
import { Course } from 'src/models/course.model';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Authentication } from 'src/models/authentication.model';
import * as queryString from 'querystring-es3';
import { PaymentType } from 'src/models/paymentType.model';
import { Payment } from 'src/models/payment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-mon-hoc',
  templateUrl: './detail-mon-hoc.component.html',
  styleUrls: ['./detail-mon-hoc.component.scss']
})
export class DetailMonHocComponent implements OnInit, OnChanges {

  isLogin = localStorage.getItem('userToken');
  @Input() detailCourse: Course
  @Input() teacherName;
  @Input() isPayment;
  display : boolean = false;
  display1 : boolean = false;
  display2 : boolean = false;
  advice : Advice = new Advice();
  checkValid: boolean = true;
  user : Authentication;
  activeIndex2 : any;
  userData ;
  relateCourse : any[] = [];
  query = {
    filter : '',
    offset : 0,
    pageSize: 15
  };
  paymentTypeList : any[];
  paymentMethod : any;
  payment = new Payment()
  constructor(
    private apiService : ApiService,
    private spinner : NgxSpinnerService,
    private message : MessageService,
    private router: Router
  ) { 
    this.user = JSON.parse(localStorage.getItem('userData'));
  }

  ngOnInit(): void {
    this.userData = {...this.user}
  }

  ngOnChanges() {
    this.teacherName = this.detailCourse.teachers.map((teacher) => {
      return teacher.name
    })    
  }

  onAdvise() {
    this.display = true;
  }

  onRegister() {
    this.display1 = true;
    this.getPaymentTypes();
    this.paymentMethod = this.paymentTypeList[0].value
  }

  sendAdvice() {
    if(this.advice.name == '' || this.advice.phone == '') {
      this.message.add({summary: 'Thông báo', detail: 'Vui lòng điền đầy đủ thông tin', severity: 'error'})
    } else {
      this.spinner.show();
      const cloneAdvice = {...this.advice}
      cloneAdvice.isAdvice = false;
      
      this.apiService.postAdvice(cloneAdvice).subscribe((response) => {
        if(response.status == 'success') {
          this.message.add({severity: 'success', summary: 'Thông báo', detail: 'Thành công'})
        }
        this.spinner.hide()
        this.display = false;
      })
    }
  }

  getPaymentTypes() {
    this.apiService.getPaymentType(queryString.stringify(this.query)).subscribe(response => {
      if(response.status == 'success') {
        this.paymentTypeList = response.data.data.map(d => {
          return {
            label: d.name,
            value: d.id
          }
        })
      }
    }) 
  }

  updateLocal() {
    const clone = {...JSON.parse(localStorage.getItem('userData'))}
    clone.address = this.userData.address
    localStorage.setItem('userData', JSON.stringify(clone))
  }

  nextBtn() {
    this.activeIndex2 = 1;

  }

  backBtn() {
    this.activeIndex2 = 0;
  }

  confirmBtn() {
    const data = {...this.payment}
    data.accountId = this.userData.id;
    data.courseId = this.detailCourse.id;
    data.otherAddress = this.userData.address;
    data.otherEmail = this.userData.email;
    data.otherName = this.userData.name;
    data.otherPhone = this.userData.phone;
    data.paymentTypeId = this.paymentMethod
    console.log('data', data);
    
    this.apiService.payment(data).subscribe(response => {
      this.spinner.show();
      if(response.status == 'success') {
        this.message.add({severity: 'success', detail: response.data.messages, summary: 'Thông báo'})
        this.display1 = false;
        this.updateLocal();
      } else {
        this.message.add({severity: 'error', detail: response.message, summary: 'Thông báo'})
        this.activeIndex2 = 1;
      }
      this.spinner.hide();
    })
  }

  directCourse(id) {
    this.router.navigate(['/mon-hoc', id]);
    setTimeout(() => {
      window.location.reload();
    }, 100)
  } 

}
