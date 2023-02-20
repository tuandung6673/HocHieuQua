import * as queryString from 'querystring-es3';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Slide } from '../../../models/slide.model';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {

  slides: any
  isLoading: boolean = false
  slideId: string
  isDisplayDialog: boolean = false
  slideDetail: Slide = new Slide()
  params = {
    offSet: 0,
    pageSize: 5,
    screen: '',
    filter: '',
    status: -1
  }
  totalRecord : number;
  statusOptions : any[] = [];

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router, private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getSlides();
    this.statusOptions = [
      {label: 'Tất cả', value: -1},
      {label: 'Hiển thị', value: 1},
      {label: 'Ẩn', value: 0}
    ];
  }
  
  getSlides() {
    this.spinner.show();
    const queryParams = queryString.stringify(this.params)
    this.apiService.getSlide(queryParams).subscribe((responseData) => {
      this.slides = responseData.data.data;
      this.totalRecord = responseData.data.recordsTotal
      this.isLoading = false;
      this.spinner.hide();
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
      // console.log('Detail Slide', responseData.data);
      this.slideDetail = responseData.data
      this.slideDetail.screen = (this.slideDetail.screen as string).split(',')
      this.slideDetail.status = this.slideDetail.status == 1
    })
  }
  
  onNewSlide() {
    this.isDisplayDialog = true
    this.slideDetail = new Slide()
  }

  onDeleteSlide(id: string) {
    this.apiService.deleteSlide(id).subscribe((responseData) => {
      console.log(responseData);
      this.slides = this.slides.filter(slide => slide.id != id )
    })
  }

  onSubmit() {
    this.isDisplayDialog = false
    const updateSlide = {...this.slideDetail}
    updateSlide.screen = updateSlide.screen.toString()
    updateSlide.status = updateSlide.status ? 1 : 0

    this.apiService.postSlide(updateSlide).subscribe((responseData) => {
      console.log(responseData);
    })

    this.router.navigate(['quan-tri/slide'])
  }

  confirmDeleteSlide(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa môn học này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            this.onDeleteSlide(id)
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
                default: 
                  return
            }
        }
    });
  }

}
