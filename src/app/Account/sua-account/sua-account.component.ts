import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Account } from 'src/models/account.model';

@Component({
  selector: 'app-sua-account',
  templateUrl: './sua-account.component.html',
  styleUrls: ['./sua-account.component.css']
})
export class SuaAccountComponent implements OnInit {

  id: string
  editAccount: Account = new Account()
  roleOptions : any = []

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
    this.apiService.getAccountsById(id).subscribe((responseData) => {
      this.editAccount = responseData.data
      this.editAccount.status = this.editAccount.status == 1
    })
  }

  getRoles() {
    this.apiService.getRoles().subscribe((responseData) => {
      this.roleOptions = responseData.data.data.map((role) => {
        return {name: role.name, code: role.id}
      })
    })
  }

  onSubmit() {
    // const updateAccount = {
    //   address: "",
    //   avatar: this.editAccount.avatar,
    //   birthday: this.editAccount.birthday,
    //   className: this.editAccount.className,
    //   courseId: null,
    //   createdBy: "",
    //   createdDate: "2022-08-17T03:39:06.94",
    //   email: this.editAccount.email,
    //   id: this.editAccount.id,
    //   identityNo: this.editAccount.identityNo,
    //   modifiedBy: "",
    //   modifiedDate: null,
    //   name: this.editAccount.name,
    //   oldPassword: "",
    //   password: this.editAccount.password,
    //   phone: this.editAccount.phone,
    //   roleDescription: null,
    //   roleId: this.editAccount.roleId,
    //   roleName: null,
    //   roles: null,
    //   status: this.editAccount.status,
    //   userId: "",
    //   userName: this.editAccount.userName
    // }

    const updateAccount = {...this.editAccount}
    updateAccount.status = updateAccount.status ? 1 : 0

    // console.log(updateAccount);
    this.apiService.postAccount(updateAccount).subscribe((responseData) => {
      console.log('Update/New Account', responseData);
      alert(responseData.message)
      this.router.navigate(['quan-tri/tai-khoan'])
    })
  }
  
}
