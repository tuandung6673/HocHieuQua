import { NgxSpinnerService } from 'ngx-spinner';
import { MenusTree } from 'src/models/menusTree.model';
import * as queryString from 'querystring-es3';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  params = {
    filter: '',
    offSet: 0,
    pageSize: 1000,
    screen: '',
    status: -1
  }
  menus : MenusTree[] = [];
  screenOptions : any[] = [];
  constructor(
    private apiSerivce: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getMenu();
    this.screenOptions = [
      {label: 'Tất cả', value: ''},
      {label: 'Trang chủ', value: 'user'},
      {label: 'Quản trị', value: 'admin'}
    ]
  }

  getMenu() {
    const queryParams = queryString.stringify(this.params);
    this.spinner.show();
    this.apiSerivce.getMenusTree(queryParams).subscribe(response => {
      this.menus = response.data.data;
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getMenu()
  }

}
