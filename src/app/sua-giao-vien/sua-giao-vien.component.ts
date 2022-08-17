import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Teacher } from 'src/models/teacher.model';
import { ApiService } from 'src/services/api.service.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component({
  selector: 'app-sua-giao-vien',
  templateUrl: './sua-giao-vien.component.html',
  styleUrls: ['./sua-giao-vien.component.css']
})
export class SuaGiaoVienComponent implements OnInit {

  Editor = ClassicEditor;
  id: string = ''
  editTeacher: Teacher = new Teacher()
  isLoading: boolean = false

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    this.isLoading = true
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-giao-vien') {
      this.getEditTeacher(this.id)
    }
  }

  getEditTeacher(id: string) {
    this.apiService.getTeacherById(id).subscribe((responseData) => {
      console.log(responseData);
      this.editTeacher = responseData.data
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
