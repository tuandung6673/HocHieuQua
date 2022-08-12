import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/models/account.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-all-account',
  templateUrl: './all-account.component.html',
  styleUrls: ['./all-account.component.css']
})
export class AllAccountComponent implements OnInit {
  
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }
  
  accounts: any;

  // ngOnInit(): void {
  //   this.apiService.getAccounts('', 0 ,10).subscribe(
  //     responseData => {
  //       // console.log(responseData.data.data);
  //       this.accounts = responseData.data.data
  //     }
  //   )
  // }

  ngOnInit() {
    
  }

}
