import { ApiService } from 'src/services/api.service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/models/classroom.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChonAnhComponent } from '../thu-vien/chon-anh/chon-anh.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sua-lop-hoc',
  templateUrl: './sua-lop-hoc.component.html',
  styleUrls: ['./sua-lop-hoc.component.css']
})
export class SuaLopHocComponent implements OnInit {

  id: string
  editClassroom: Classroom = new Classroom();
  defaultAvatar = "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg";
  isBack : boolean;

  constructor(private messageService: MessageService, private dialogService: DialogService, private apiService: ApiService, private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id']
    })
    this.route.queryParams.subscribe(params => {
      this.isBack = params?.isBack == 1 ? true: false;
    })
    if(this.id && this.id != 'sua-lop-hoc') {
      this.getEditClassroom(this.id)
    } else {
      document.title = "Thêm Lớp học";
    }
  }

  getEditClassroom(id: string) {
    this.spinner.show();
    this.apiService.getClassroomById(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      document.title = "Lớp học " + responseData.data.name;
      this.editClassroom = responseData.data;
      this.editClassroom.status = responseData.data.status == 1;
    })
  }

  onSubmit() {
    const updateClassroom = {...this.editClassroom}
    updateClassroom.status = updateClassroom.status ? 1 : 0
    this.apiService.postClassroom(updateClassroom).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary:'Thành công', detail: responseData.message})
        this.router.navigate(['quan-tri/lop-hoc'])
      } else {
        this.messageService.add({severity: 'error', summary:'Thất bại', detail: responseData.message})
      }
    })
  }

  cancel() {
    this.router.navigate(['quan-tri/lop-hoc'])
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
        this.editClassroom = {
          ...this.editClassroom,
          [field]: "https://tank8.bsite.net/images/" + imgUrl 
        }
      } else {
        return;
      }
    })
  }

}
