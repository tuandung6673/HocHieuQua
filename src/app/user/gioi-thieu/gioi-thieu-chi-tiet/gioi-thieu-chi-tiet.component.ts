import { New } from './../../../../models/new.model';
import { forkJoin, finalize } from 'rxjs';
import { ApiService } from './../../../../services/api.service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'

import { Comment } from 'src/models/comment.model';
import { NewCatagory } from 'src/models/newCategory.model';

@Component({
  selector: 'app-gioi-thieu-chi-tiet',
  templateUrl: './gioi-thieu-chi-tiet.component.html',
  styleUrls: ['./gioi-thieu-chi-tiet.component.scss']
})
export class GioiThieuChiTietComponent implements OnInit {

  comments : Comment[] = []
  lastestNew : New[] = [];
  mostViewNew : New[] = [];
  newsCategory : NewCatagory[] = [];
  editNews : New = new New();
  id: string;
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.getData()
    })

  }

  getData() {
    this.spinner.show()
    forkJoin([
      this.apiService.getNewsById(this.id),
      this.apiService.getNews(),
      this.apiService.getNewCategory(),
      this.apiService.getComment(this.id)
    ])
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      this.editNews = responseData[0].data;
      this.editNews.createdDate = moment(this.editNews.createdDate).format('DD-MM-YYYY k:mm:ss')

      this.mostViewNew = responseData[1].data.data.slice(0, 3)
      this.lastestNew = responseData[1].data.data.slice(-3)

      this.newsCategory = responseData[2].data.data

      this.comments = responseData[3].data.data

      this.spinner.hide()
    })
  }
}
