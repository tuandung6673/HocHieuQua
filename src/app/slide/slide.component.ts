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
  screenArray = []
  cloneSlideDetail: Slide = new Slide()
  idSlideEditSelected: string
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
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    // console.log('slide event', event.first ,event.rows ,event.page ,event.pageCount);
    
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getSlides()
  }

  editSlide(slideId: string) {
    this.isDisplayDialog = true
    this.idSlideEditSelected = slideId
    this.getSlideDetailById(slideId)
  }

  getSlideDetailById(id: string) {
    this.apiService.getSlideById(id).subscribe((responseData) => {
      console.log('Detail Slide', responseData.data);
      this.slideDetail = responseData.data
      this.slideDetail.screen = (this.slideDetail.screen as string).split(',')
      this.slideDetail.status = this.slideDetail.status == 1
    })
  }

  onSubmit() {
    // const submitForm = {
    //   id: this.slideDetail.id,
    //   imageUrl: this.slideDetail.imageUrl,
    //   name: this.slideDetail.name,
    //   order: this.slideDetail.order,
    //   screen: this.slideDetail.screen.toString(),
    //   status: this.slideDetail.status
    // } 
    // console.log(submitForm);
    this.isDisplayDialog = false
    const updateSlide = {...this.slideDetail}
    updateSlide.screen = updateSlide.screen.toString()
    updateSlide.status = updateSlide.status ? 1 : 0
    
    this.apiService.postSlide(updateSlide).subscribe((responseData) => {
      console.log(responseData);
    })
  }

}
