import * as queryString from 'querystring-es3';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Slide } from '../../../models/slide.model';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, pipe } from 'rxjs';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  slides: any
  slideId: string
  isDisplayDialog: boolean = false
  slideDetail: Slide = new Slide()
  displayBasic : boolean = false;
  menuOptions = [];
  params = {
    offSet: 0,
    pageSize: 10,
    screen: '',
    filter: '',
    status: -1
  }
  totalRecord : number;
  statusOptions : any[] = [];

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router, private spinner:NgxSpinnerService) {
    document.title = "Slide"
  }

  ngOnInit(): void {
    this.getSlides();
    this.statusOptions = [
      {label: 'Tất cả', value: -1},
      {label: 'Hiển thị', value: 1},
      {label: 'Ẩn', value: 0}
    ];
    this.getMenuOptions();
  }
  
  getSlides() {
    this.spinner.show();
    const queryParams = queryString.stringify(this.params)
    this.apiService.getSlide(queryParams)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      this.slides = responseData.data.data;
      this.totalRecord = responseData.data.recordsTotal
    })
  }
  onSearch() {
    this.getSlides();
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getSlides()
  }

  editSlide(slideId: string) {
    this.isDisplayDialog = true
    this.getSlideDetailById(slideId)
  }

  getSlideDetailById(id: string) {
    this.apiService.getSlideById(id).subscribe((responseData) => {
      this.slideDetail = responseData.data
      this.slideDetail.screen = (this.slideDetail.screen as string).split(',')
      this.slideDetail.status = this.slideDetail.status == 1;
    })    
  }
  
  onNewSlide() {
    this.isDisplayDialog = true
    this.slideDetail = new Slide()
  }

  onDeleteSlide(id: string) {
    this.apiService.deleteSlide(id).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: responseData.message})
        this.slides = this.slides.filter(slide => slide.id != id )
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.message})
      }
    })
  }

  onSubmit() {
    const updateSlide = {...this.slideDetail}
    updateSlide.screen = updateSlide.screen.toString()
    updateSlide.status = updateSlide.status ? 1 : 0

    this.apiService.postSlide(updateSlide).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: responseData.message})
        this.getSlides();
        this.isDisplayDialog = false;
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.message})
      }
    })
  }

  confirmDeleteSlide(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa Slide này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.onDeleteSlide(id)
        }
    });
  }

  getMenuOptions() {
    this.apiService.getMenu('', 0, 100, 'user', 1).subscribe(response => {
      this.menuOptions = response.data.data.map(m => {
        return {
          label: m.name,
          value: m.code
        }
      })
    })
  }

}
