import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Teacher } from 'src/models/teacher.model';
import { ApiService } from 'src/services/api.service.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChonAnhComponent } from '../thu-vien/chon-anh/chon-anh.component';
import TinyMCE from 'src/common/constants/tiny.constant';
import * as queryString from 'querystring-es3';
import { Account } from 'src/models/account.model';

@Component({
  selector: 'app-sua-giao-vien',
  templateUrl: './sua-giao-vien.component.html',
  styleUrls: ['./sua-giao-vien.component.scss']
})
export class SuaGiaoVienComponent implements OnInit {
  editorConfig = TinyMCE;
  defaultAvatar = 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'
  Editor = ClassicEditor;
  id: string = ''
  editTeacher: any = new Teacher()
  teacherSelected: Teacher = new Teacher()
  query = {
    offSet: 0,
    pageSize: 100,
    filter: ''
  }
  newTeacher : Account = new Account;
  newTeacherOptions = [];

  constructor(private dialogService: DialogService, private apiService: ApiService, private route: ActivatedRoute, private router: Router, private messageService: MessageService, private spinner: NgxSpinnerService) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    })
  }

  ngOnInit(){
    if(this.id && this.id != 'them-giao-vien') {
      this.getEditTeacher(this.id);
    } else {
      this.getAccountNotTeacher();
      document.title = "Thêm giáo viên";
    }
  }

  getEditTeacher(id: string) {
    this.spinner.show();
    this.apiService.getTeacherById(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      document.title = "Giáo viên " + responseData.data.name;
      this.editTeacher = responseData.data;
      this.editTeacher.status = responseData.data.status == 1 ? true : false;
    })
  }

  getAccountNotTeacher() {
    const queryParams = queryString.stringify(this.query);
    this.apiService.getAccountNotTeacher(queryParams).subscribe((response) => {
      this.newTeacherOptions = response.data.data.map((account) => {
        return {...account, label: `${account.name} - ${account.userName}`, value: account.id}
      })
    })
  }

  changeTeacher() {
    const teacherSelected = this.newTeacherOptions.filter(teacher => teacher.id === this.teacherSelected)
    this.editTeacher = teacherSelected[0];
  }

  onSubmit() {
    // const dataSave = {...this.editTeacher, status: this.editTeacher.status ? 1 : 0};
    let dataSave = new Teacher();
    dataSave = {
      ...dataSave,
      accountId: this.editTeacher.id,
      avatar: this.editTeacher.avatar,
      email: this.editTeacher.email,
      identityNo: this.editTeacher.identityNo,
      name: this.editTeacher.name,
      phone: this.editTeacher.phone
    }
    this.apiService.postTeacher(dataSave)
    .subscribe(reponse => {
      if(reponse.status == 'success') {
        this.messageService.add({severity: 'success', summary:'Thành công', detail: reponse.message})
        this.router.navigate(['quan-tri/giao-vien'])
      } else {
        this.messageService.add({severity: 'warn', summary:'Thất bại', detail: reponse.message})
      }
    })
  }

  cancel() {
    this.router.navigate(['quan-tri/giao-vien'])
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
        this.editTeacher = {
          ...this.editTeacher,
          [field]: "https://tank8.bsite.net/images/" + imgUrl 
        }
      } else {
        return;
      }
    })
  }

}
