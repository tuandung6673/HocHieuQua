import { Action } from './../../../../models/action.model';
import { Menu } from './../../../../models/menu.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenusTree } from 'src/models/menusTree.model';
import * as queryString from 'querystring-es3';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';
import { finalize } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  actionsParams = {
    filter: '',
    offSet: 0,
    pageSize: 1000
  }
  adminMenuParams = {
    filter: '',
    offSet: 0,
    pageSize: 1000,
    screen: 'admin',
    status: 1
  }
  menus : MenusTree[] = [];
  adminMenus : any[] = []; 
  selectMenu : MenusTree = new MenusTree();
  screenOptions : any[] = [];
  displayBasic: boolean = false;
  actionsOptions = [];
  
  selected : any;
  parentSelect : any;
  abc : any;
  constructor(
    private apiSerivce: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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

  
  getMenu() {
    const queryParams = queryString.stringify(this.params);
    this.spinner.show();
    this.apiSerivce.getMenusTree(queryParams).subscribe(response => {
      this.menus = response.data.data;
      this.spinner.hide();
    })
  }
  
  actionList = [];
  showDialog(menu) {
    this.actionList = [];
    this.displayBasic = true;
    this.getActions();
    this.getAdminMenus();
    // this.parentSelect = menu?.parentId;
    // this.parentSelect = {
    //   label: 'hahahhah',
    //   value: menu?.parentId

    // }
    this.selectMenu = {...menu};
    this.selectMenu.name = menu?.name;
    this.selectMenu.path = menu?.path;
    this.selectMenu.parentId = menu?.parentId;
    
    this.selectMenu.order = menu?.order;
    this.selectMenu.icon = menu?.icon;
    this.selectMenu.screen = menu?.screen;
    this.selectMenu.status = menu?.status == 1 ? true : false;
    let actions = JSON.parse(menu?.actions) as [];
    actions && actions.length > 0 && actions.map(a => {
      this.actionList.push(a['action_code'])
    })
  }


  buildTree = (arr : any[]) => {
    return arr.map(t => {
      if(t.childs && t.childs.length) {
        t.childs = this.buildTree(t.childs)
      }
      const result = {
        label: t.name,
        value: t.id,
        // expandedIcon: 'pi pi-fw pi-chevron-down',
        // collapsedIcon: 'pi pi-fw pi-chevron-right',
        children: t.childs,
      }
      if(result.children && result.children.length == 0) {
        delete result.children;
      }
      return result
    })
  }

  getAdminMenus() {
    const adminQueryParams = queryString.stringify(this.adminMenuParams);
    this.apiSerivce.getMenusTree(adminQueryParams).subscribe(response => {
      this.adminMenus = this.buildTree(response.data.data);
      console.log(this.buildTree(response.data.data));
      
    })
  }

  select(e) {
    // this.parentSelect = e.node.value;
    console.log(this.parentSelect);
  }

  saveMenu() {
    const updateData = {
      ...this.selectMenu,
      status: this.selectMenu.status ? 1 : 0,
      actions: JSON.stringify(this.actionList)
    }
    this.spinner.show();
    this.apiSerivce.postMenu(updateData)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.message});
        this.getMenu();
      } else {
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.message});
      }
      this.displayBasic = false;
    })
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

  onSearch() {
    this.getMenu()
  }

  addNewMenu() {
    this.getActions();
    this.getAdminMenus();
    this.selectMenu = new MenusTree();
    this.displayBasic = true;
  }

  onDeleteMenu(id) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa Menu này?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.apiSerivce.deleteMenu(id)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe(response => {
          if(response.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.data.messages});
            this.getMenu();
          } else {
            this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.data.messages});
          }
        })
      }
    })  
  }
}
