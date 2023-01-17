import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TRISTATECHECKBOX_VALUE_ACCESSOR } from 'primeng/tristatecheckbox';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  menu: any
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.apiService.getMenu('', 0, 1000, 'user', 1).subscribe((responseData) => {
      // this.menu = responseData.data.data.map(t => {
      //   return {
      //     label: t.name,
      //     icon: t.icon,
      //     command: () => {
      //       this.router.navigate([t.path])
      //     }
      //   }
      // })
      this.menu = responseData.data.data;
    })
  }

  getLog() {
    console.log(this.menu);
    
  }
}
