import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, Input, OnInit } from '@angular/core';
import { New } from 'src/models/new.model';
import { ApiService } from 'src/services/api.service.service';
import { NewCatagory } from 'src/models/newCategory.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-gioi-thieu',
  templateUrl: './gioi-thieu.component.html',
  styleUrls: ['./gioi-thieu.component.scss']
})
export class GioiThieuComponent implements OnInit {
  
  id : string
  news: New[] = []
  mostViewNew: any;
  lastestNew: any
  newsCategory: NewCatagory[] = []
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.getData(this.id)
    })
  }

  getData(id) {
    this.spinner.show()
    forkJoin([
      this.apiService.getNews(id),
      this.apiService.getNewCategory(),

    ]).subscribe(response => {
      this.news = response[0].data.data
      this.mostViewNew = response[0].data.data.slice(0, 3)
      this.lastestNew = response[0].data.data.slice(-3)

      this.newsCategory = response[1].data.data
      this.spinner.hide()
    })
  }

}
