import { Role } from 'src/models/role.model';
import * as queryString from 'querystring-es3';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nhom-quyen',
  templateUrl: './nhom-quyen.component.html',
  styleUrls: ['./nhom-quyen.component.scss']
})
export class NhomQuyenComponent implements OnInit {
  params = {
    filter: '',
    offSet: 0,
    pageSize: 5
  }
  totalRecord : number;
  roles : Role[] = [];
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    const queryParams = queryString.stringify(this.params);
    this.spinner.show();
    this.apiService.getRoles(queryParams).subscribe(response => {
      this.roles = response.data.data;
      this.totalRecord = response.data.recordsTotal
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getRoles();
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }    
    this.getRoles();
  }
}
