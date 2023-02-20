import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Account } from 'src/models/account.model';
import * as queryString from 'querystring-es3';


@Component({
  selector: 'app-sua-account',
  templateUrl: './sua-account.component.html',
  styleUrls: ['./sua-account.component.css']
})
export class SuaAccountComponent implements OnInit {

  id: string
  isLoading: boolean = false
  editAccount: Account = new Account()
  roleOptions : any = []
  roldParams = {
    offSet: 0,
    pageSize: 1000,
    filter: '',
  }

  constructor(private route : ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-tai-khoan') {
      this.getEditAccount(this.id)
    } 
    this.getRoles()
  }

  getEditAccount(id: string) {
    this.isLoading = true
    this.apiService.getAccountsById(id).subscribe((responseData) => {
      this.editAccount = responseData.data
      this.editAccount.status = this.editAccount.status == 1
      this.isLoading = false
    })
  }

  getRoles() {
    const queryParams = queryString.stringify(this.roldParams)
    this.apiService.getRoles(queryParams).subscribe((responseData) => {
      this.roleOptions = responseData.data.data.map((role) => {
        return {name: role.name, code: role.id}
      })
    })
  }

  onSubmit() {
    const updateAccount = {...this.editAccount}
    updateAccount.status = updateAccount.status ? 1 : 0
    this.apiService.postAccount(updateAccount).subscribe((responseData) => {
      alert(responseData.message)
      this.router.navigate(['quan-tri/tai-khoan'])
    })
  }
  
}
