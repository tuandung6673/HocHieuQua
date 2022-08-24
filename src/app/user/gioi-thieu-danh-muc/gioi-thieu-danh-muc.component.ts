import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { New } from 'src/models/new.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-gioi-thieu-danh-muc',
  templateUrl: './gioi-thieu-danh-muc.component.html',
  styleUrls: ['./gioi-thieu-danh-muc.component.css']
})
export class GioiThieuDanhMucComponent implements OnInit {

  news: New[] = []
  id: string
  constructor(private apiService: ApiService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getNews()
  }

  getNews() {
    this.spinner.show()
    this.apiService.getNews(this.id).subscribe((responseData) => {
      console.log(responseData.data.data);
      
      this.news = responseData.data.data
      this.spinner.hide()
    })
  }

}
