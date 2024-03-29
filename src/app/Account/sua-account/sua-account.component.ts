import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as queryString from 'querystring-es3';
import { finalize } from 'rxjs';
import { ChonAnhComponent } from 'src/app/quan-tri/thu-vien/chon-anh/chon-anh.component';
import { Account } from 'src/models/account.model';
import { ApiService } from 'src/services/api.service.service';


@Component({
  selector: 'app-sua-account',
  templateUrl: './sua-account.component.html',
  styleUrls: ['./sua-account.component.css']
})
export class SuaAccountComponent implements OnInit {

  id: string;
  editAccount: Account = new Account();
  roleOptions : any = []
  roleParams = {
    offSet: 0,
    pageSize: 1000,
    filter: '',
  }

  constructor(
    private route : ActivatedRoute, 
    private apiService: ApiService, 
    private router: Router,
    private messageService: MessageService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-tai-khoan') {
      this.getEditAccount(this.id)
    } else {
      document.title = "Thêm tài khoản"
    }
    this.getRoles()
  }

  getEditAccount(id: string) {
    this.spinner.show();
    this.apiService.getAccountsById(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      if(responseData.status == 'success') {
        document.title = "Tài khoản " + responseData.data.name;
        this.editAccount = responseData.data
        this.editAccount.status = this.editAccount.status == 1
        this.spinner.hide();
      }
    })
  }

  getRoles() {
    const queryParams = queryString.stringify(this.roleParams)
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
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Cập nhật tài khoản thành công'})
        this.router.navigate(['quan-tri/tai-khoan'])
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.message})
      }
    })
  }
  
  cancel() {
    this.router.navigate(['quan-tri/tai-khoan']);
  }

  ref: DynamicDialogRef;
  uploadImage(field) {
    this.ref = this.dialogService.open(ChonAnhComponent, {
      header: 'Thư viện ảnh',
      width: '90%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
    });
    
    this.ref.onClose.subscribe((imgUrl) => {
      if(imgUrl) {
        this.editAccount = {
          ...this.editAccount,
          [field]: "https://tank8.bsite.net/images/" + imgUrl 
        }
      } else {
        return;
      }
    })
  }
}
