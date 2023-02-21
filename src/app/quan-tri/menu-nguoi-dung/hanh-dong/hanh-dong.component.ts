import { Action } from './../../../../models/action.model';
import * as queryString from 'querystring-es3';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hanh-dong',
  templateUrl: './hanh-dong.component.html',
  styleUrls: ['./hanh-dong.component.scss']
})
export class HanhDongComponent implements OnInit {

  params = {
    filter: '',
    offSet: 0,
    pageSize: 5
  }
  totalRecord : number;
  actions : Action[] = [];
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getActions();
  }

  getActions() {
    const queryParams = queryString.stringify(this.params)
    this.spinner.show();
    this.apiService.getAction(queryParams).subscribe(response => {
      this.actions = response.data.data;
      this.totalRecord = response.data.recordsTotal
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getActions();
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }    
    this.getActions();
  }

}
