import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Teacher } from 'src/models/teacher.model';
import { ApiService } from 'src/services/api.service.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-sua-giao-vien',
  templateUrl: './sua-giao-vien.component.html',
  styleUrls: ['./sua-giao-vien.component.css']
})
export class SuaGiaoVienComponent implements OnInit {

  defaultAvatar = 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'
  Editor = ClassicEditor;
  id: string = ''
  editTeacher: Teacher = new Teacher()

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private messageService: MessageService, private spinner: NgxSpinnerService) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
  }

  ngOnInit(){
    if(this.id && this.id != 'them-giao-vien') {
      this.getEditTeacher(this.id);
    } else {
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

  onSubmit() {
    const dataSave = {...this.editTeacher};
    dataSave.status = dataSave.status ? 1 : 0;
    this.apiService.postTeacher(dataSave)
    .subscribe(reponse => {
      if(reponse.status == 'success') {
        this.messageService.add({severity: 'success', summary:'Thành công', detail: 'Cập nhật Giáo viên thành công'})
        this.router.navigate(['quan-tri/giao-vien'])
      } else {
        this.messageService.add({severity: 'warn', summary:'Thất bại', detail: 'Cập nhật Giáo viên thất bại'})
      }
    })
  }

  cancel() {

  }

}
