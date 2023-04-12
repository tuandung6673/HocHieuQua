import { NgxSpinnerService } from 'ngx-spinner';
import { New } from './../../../../models/new.model';
import { ApiService } from './../../../../services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bai-viet',
  templateUrl: './bai-viet.component.html',
  styleUrls: ['./bai-viet.component.scss']
})
export class BaiVietComponent implements OnInit {

  search: string
  news: New[] = []
  params = {
    offSet: 0,
    pageSize: 5,
    filter: '',
    categoryId: '',
    status: -1
  }
  totalRecord : number = 0;
  statusOptions : any[] = [];
  categoryIdOptions : any[] = [];
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private messageService: MessageService) {
    document.title = "Tin tức"
  }

  ngOnInit(): void {
    this.getNews();
    this.statusOptions = [
      {label: 'Tất cả', value: -1},
      {label: 'Hiển thị', value: 1},
      {label: 'Ẩn', value: 0}
    ];
    this.getCategoryIdOptions();
  }

  getNews() {
    this.spinner.show();
    this.apiService.getNews(this.params.categoryId, this.params.offSet,this.params.pageSize, this.params.filter, this.params.status)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      this.news = responseData.data.data;
      this.totalRecord = responseData.data.recordsTotal
      this.spinner.hide();
    })
  }

  getCategoryIdOptions() {
    this.apiService.getNewCategory().subscribe(response => {
      this.categoryIdOptions = response.data.data.map(c => {
        return {
          label: c.name,
          value: c.id
        }
      })
      this.categoryIdOptions = [{label: 'Tất cả', value: ''}, ...this.categoryIdOptions]
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

  confirmDeleteNew(id) {
    this.spinner.show();
    this.apiService.deleteNews(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Xóa tin tức thành công'})
        this.news = this.news.filter(n => n.id !=id)
      } else {
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: 'Xóa tin tức thất bại'})
      }
    })
  }

}
