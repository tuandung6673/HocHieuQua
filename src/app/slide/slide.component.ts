import { Slide } from './../../models/slide.model';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  slides: any
  isLoading: boolean = false
  slideId: string
  isDisplayDialog: boolean = false
  slideDetail: Slide = new Slide()
  params = {
    offSet: 0,
    pageSize: 2,
    screen: '',
    filter: '',
    totalRecord: 0
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getSlides()
  }
  
  getSlides() {
    this.apiService.getSlide(this.params.offSet, this.params.pageSize, this.params.screen, this.params.filter).subscribe((responseData) => {
      console.log(responseData.data.data);
      this.slides = responseData.data.data
      this.params = {
        ...this.params,
        totalRecord: responseData.data.recordsTotal
      }
      this.isLoading = false
    })
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

  onSubmit() {
    this.isDisplayDialog = false
    const updateSlide = {...this.slideDetail}
    updateSlide.screen = updateSlide.screen.toString()
    updateSlide.status = updateSlide.status ? 1 : 0

    this.apiService.postSlide(updateSlide).subscribe((responseData) => {
      console.log(responseData);
    })
  }

}
