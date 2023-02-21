import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import * as queryString from 'querystring-es3';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menusTree: any
  params = {
    filter: '',
    offSet: 0,
    pageSize: 1000,
    screen: 'admin',
    status: 1
  }
  constructor(private apiService: ApiService, private router: Router) { }

  buildTree = (arr: any[]) => {
    return arr.map(t => {
        if (t.childs && t.childs.length) {
            t.childs = this.buildTree(t.childs);
        }
        const result =  {
            label: t.name,
            items: t.childs,
            icon: t.icon,
            command: () => {
                if (t.path !== 'none') {
                  this.router.navigate([t.path])
                }
            }
        };
        if (result.items && result.items.length === 0) {
            delete result.items;
        }
        return result
    })
  }

  ngOnInit(): void { 
    const queryParams = queryString.stringify(this.params)
    this.apiService.getMenusTree(queryParams).subscribe((responseData) => {
      this.menusTree = this.buildTree(responseData.data.data);
    });
  }
}


