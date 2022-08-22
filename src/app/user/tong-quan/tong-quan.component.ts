import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

import SwiperCore, { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-tong-quan',
  templateUrl: './tong-quan.component.html',
  styleUrls: ['./tong-quan.component.scss']
})
export class TongQuanComponent implements OnInit {

  imageSlider = []
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getImageSlider()
  }

  getImageSlider() {
    this.apiService.getHome().subscribe((responseData) => {
      this.imageSlider = responseData.data.slides;    
    })
  }

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  onSwiper(a) {
    console.log(a);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
