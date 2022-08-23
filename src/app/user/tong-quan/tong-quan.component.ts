import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

import SwiperCore, { SwiperOptions } from 'swiper';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-tong-quan',
  templateUrl: './tong-quan.component.html',
  styleUrls: ['./tong-quan.component.scss']
})
export class TongQuanComponent implements OnInit {

  home : any
  imageSlider = []
  classSlider : any
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.getHome()
  }

  getHome() {
    this.apiService.getHome().subscribe((responseData) => {
      this.home = responseData.data
      this.imageSlider = responseData.data.slides;  
      this.spinner.hide() 
    })
  }

}
