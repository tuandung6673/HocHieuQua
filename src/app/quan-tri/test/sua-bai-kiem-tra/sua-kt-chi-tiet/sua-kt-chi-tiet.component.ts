import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import * as queryString from 'querystring-es3';
import { finalize } from 'rxjs';
import TinyMCE from 'src/common/constants/tiny.constant';
import { Test } from 'src/models/test.model';
import { ApiService } from 'src/services/api.service.service';


@Component({
  selector: 'app-sua-kt-chi-tiet',
  templateUrl: './sua-kt-chi-tiet.component.html',
  styleUrls: ['./sua-kt-chi-tiet.component.scss']
})
export class SuaKtChiTietComponent implements OnInit {
  editorConfig = TinyMCE
  @Output() sendData = new EventEmitter<Test>();
  @Input() test : Test;
  Editor = ClassicEditor;
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
