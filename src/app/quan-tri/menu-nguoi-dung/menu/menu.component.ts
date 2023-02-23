import { Action } from './../../../../models/action.model';
import { Menu } from './../../../../models/menu.model';
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

  actionsParams = {
    filter: '',
    offSet: 0,
    pageSize: 1000
  }
  params = {
    filter: '',
    offSet: 0,
    pageSize: 1000,
    screen: '',
    status: -1
  }
  menus : MenusTree[] = [];
  selectMenu : MenusTree = new MenusTree();
  screenOptions : any[] = [];
  displayBasic: boolean = false;
  actionsOptions = [];
  abc : any;
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

  screenOption = [
    {label: 'Trang chủ', value: 'user'},
    {label: 'Quản trị', value: 'admin'}
  ]

  showDialog(menu) {
    this.displayBasic = true;
    this.getActions();
    this.selectMenu.name = menu?.name;
    this.selectMenu.path = menu?.path;
    this.selectMenu.parentId = menu?.parentId;
    this.selectMenu.order = menu?.order;
    this.selectMenu.icon = menu?.icon;
    this.selectMenu.screen = menu?.screen;
    this.selectMenu.status = menu?.status == 1 ? true : false;
    this.selectMenu.actions = JSON.parse(menu?.actions);
    // console.log(this.selectMenu.actions);
  }

  // convertActions(arr) {
  //   arr.map(a => {
  //     return {

  //     }
  //   })
  // }

  abcd() {
    console.log(this.abc);
    
  }

  getActions() {
    this.spinner.show()
    const queryParams = queryString.stringify(this.actionsParams);
    this.apiSerivce.getAction(queryParams).subscribe(response => {
      this.actionsOptions = response.data.data.map(a => {
        return {
          label: a.actionName,
          value: a.actionCode
        }
      })
      this.spinner.hide();
    })
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
