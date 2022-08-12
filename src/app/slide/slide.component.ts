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
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getSlides()
  }


}
