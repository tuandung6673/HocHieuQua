import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menus: any

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
    this.apiService.getMenusTree(0, 1000, '' , 'admin', 1).subscribe((responseData) => {
      this.menus = this.buildTree(responseData.data.data);
    });
  }
}


