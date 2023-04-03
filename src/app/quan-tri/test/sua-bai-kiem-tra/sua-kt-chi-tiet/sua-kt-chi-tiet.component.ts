import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as queryString from 'querystring-es3';
import { TestCategory } from 'src/models/testCategory.model';
import { Test } from 'src/models/test.model';


@Component({
  selector: 'app-sua-kt-chi-tiet',
  templateUrl: './sua-kt-chi-tiet.component.html',
  styleUrls: ['./sua-kt-chi-tiet.component.scss']
})
export class SuaKtChiTietComponent implements OnInit {

  @Input() test : Test;
  @Output() sendData = new EventEmitter<Test>();
  testCategoryOptions = [];
  testCategoryParam = {
    filter : '', 
    offSet: 0,
    pageSize: 1000,
    status: 1
  }
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getTestCategory();
  }

  getTestCategory() {
    this.spinner.show();
    const queryParams = queryString.stringify(this.testCategoryParam);
    this.apiService.getTestCategory(queryParams)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      this.testCategoryOptions = response.data.data.map(t => {
        return {
          label: t.name,
          value: t.code
        }
      })
    })
  }
}