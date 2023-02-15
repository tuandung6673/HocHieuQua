import { New } from './../../../../models/new.model';
import { ApiService } from './../../../../services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bai-viet',
  templateUrl: './bai-viet.component.html',
  styleUrls: ['./bai-viet.component.scss']
})
export class BaiVietComponent implements OnInit {

  search: string
  isLoading: boolean = false
  news: New[] = []
  params = {
    offSet: 0,
    pageSize: 5,
    filter: '',
    categoryId: '',
    totalRecord: 0,
    status: 1
  }

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getNews()
  }

  getNews() {
    // this.isLoading = true
    this.apiService.getNews(this.params.categoryId, this.params.offSet,this.params.pageSize, this.params.filter, this.params.status).subscribe((responseData) => {
      this.news = responseData.data.data
      this.params = {
        ...this.params,
        totalRecord: responseData.data.recordsTotal
      }
      console.log(this.news);
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
    this.getNews()
  }

  onSearch() {
    this.params = {
      ...this.params,
      filter: this.search
    }
    this.getNews()
  }

}
