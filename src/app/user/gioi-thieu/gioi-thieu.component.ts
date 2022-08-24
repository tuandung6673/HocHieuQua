import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { New } from 'src/models/new.model';
import { ApiService } from 'src/services/api.service.service';
import { NewCatagory } from 'src/models/newCategory.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-gioi-thieu',
  templateUrl: './gioi-thieu.component.html',
  styleUrls: ['./gioi-thieu.component.css']
})
export class GioiThieuComponent implements OnInit {

  news: New[] = []
  mostViewNew: any;
  lastestNew: any
  newsCategory: NewCatagory[] = []
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getData()
  }

  // async getData() {
  //   const newsResponse = await this.apiService.getNews();
  //   const categoryReponse = await this.apiService.getNewCategory();

  // }

  getData() {
    this.spinner.show()
    forkJoin([
      this.apiService.getNews(),
      this.apiService.getNewCategory()
    ]).subscribe(response => {
      console.log('ressolve:', response);

      this.news = response[0].data.data
      this.mostViewNew = response[0].data.data.slice(0, 4)
      this.lastestNew = response[0].data.data.slice(-4)

      this.newsCategory = response[1].data.data
      this.spinner.hide()
    })
  }

  // // getNews() {
  //   this.apiService.getNews().subscribe((responseData) => {
  //     this.news = responseData.data.data
  //     this.mostViewNew = responseData.data.data.slice(0, 4)
  //     this.lastestNew = responseData.data.data.slice(-4)
  //   })
  // }

  // getNewsCategory() {
  //   this.apiService.getNewCategory().subscribe((responseData) => {
  //     this.newsCategory = responseData.data.data
  //   })
  // }


}
