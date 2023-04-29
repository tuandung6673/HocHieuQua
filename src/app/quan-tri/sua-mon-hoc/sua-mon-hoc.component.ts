import { ApiService } from 'src/services/api.service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/models/subject.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChonAnhComponent } from '../thu-vien/chon-anh/chon-anh.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sua-mon-hoc',
  templateUrl: './sua-mon-hoc.component.html',
  styleUrls: ['./sua-mon-hoc.component.css']
})
export class SuaMonHocComponent implements OnInit {

  id: string
  editSubject: Subject = new Subject()
  optionsLopHoc: any = [];
  classId : string;
  defaultAvatar = 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'

  constructor(private messageService: MessageService, private dialogService: DialogService, private router: Router, private apiService: ApiService, private route: ActivatedRoute, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-mon-hoc') {
      this.getEditSubject(this.id)
    } else {
      document.title = "Thêm môn học";
    }
    this.route.queryParams.subscribe(params => {
      this.classId = params?.classId;
    })
    this.getClassroomForOption();
  }


  getEditSubject (id: string) {
    this.spinner.show();
    this.apiService.getSubjectById(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      document.title = "Môn học " + responseData.data.name; 
      this.editSubject = responseData.data;
      this.editSubject.status = this.editSubject.status == 1 ? true : false;
    })
  }

  getClassroomForOption () {
    this.apiService.getClassroom().subscribe((reponseLopHoc) => {
      this.optionsLopHoc = reponseLopHoc.data.data.map((lopHoc) => {
        return {name: lopHoc.name, code: lopHoc.id}
      })
    })
  }

  onSubmit() {
    const updateSubject = {...this.editSubject}
    updateSubject.status = updateSubject.status ? 1 : 0;
    this.apiService.postSubject(updateSubject).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary:'Thành công', detail: responseData.message})
        if(this.classId) {
          this.router.navigate(['quan-tri/lop-hoc', this.classId], {queryParams: {isBack : 1}})
        } else {
          this.router.navigate(['quan-tri/mon-hoc'])
        }
      } else {
        this.messageService.add({severity: 'error', summary:'Thất bại', detail: responseData.message})
      }
    })
  }

  cancel() {
    if(this.classId) {
      this.router.navigate(['quan-tri/lop-hoc', this.classId], {queryParams: {isBack : 1}})
    } else {
      this.router.navigate(['quan-tri/mon-hoc'])
    }
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
        this.editSubject = {
          ...this.editSubject,
          [field]: "https://tank8.bsite.net/images/" + imgUrl 
        }
      } else {
        return;
      }
    })
  }
}
