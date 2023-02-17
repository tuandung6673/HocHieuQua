import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Teacher } from 'src/models/teacher.model';
import { ApiService } from 'src/services/api.service.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


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
  isLoading: boolean = false

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-giao-vien') {
      this.getEditTeacher(this.id)
    }
  }

  getEditTeacher(id: string) {
    this.isLoading = true
    this.apiService.getTeacherById(id).subscribe((responseData) => {
      console.log(responseData);
      this.editTeacher = responseData.data;
      this.editTeacher.status = responseData.data.status == 1 ? true : false;
      this.isLoading = false
    })
  }

  onSubmit() {
    const dataSave = {...this.editTeacher};
    dataSave.status = dataSave.status ? 1 : 0;
    this.apiService.postTeacher(dataSave)
    .subscribe(reponse => {
      console.log('Submit Teacher', reponse);
      this.router.navigate(['quan-tri/giao-vien'])
    })
  }

}
