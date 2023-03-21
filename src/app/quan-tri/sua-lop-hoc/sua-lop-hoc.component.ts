import { ApiService } from 'src/services/api.service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Classroom } from 'src/models/classroom.model';

@Component({
  selector: 'app-sua-lop-hoc',
  templateUrl: './sua-lop-hoc.component.html',
  styleUrls: ['./sua-lop-hoc.component.css']
})
export class SuaLopHocComponent implements OnInit {

  id: string
  isLoading: boolean = false
  editClassroom: Classroom = new Classroom();
  defaultAvatar = "https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = param['id']
    })
    console.log(this.id);
    
    if(this.id && this.id != 'sua-lop-hoc') {
      this.getEditClassroom(this.id)
    } else {
      document.title = "Thêm Lớp học";
    }
  }

  getEditClassroom(id: string) {
    this.apiService.getClassroomById(id).subscribe((responseData) => {
      document.title = "Lớp học " + responseData.data.name;
      this.editClassroom = responseData.data;
      this.editClassroom.status = responseData.data.status == 1;
    })
  }

  onSubmit() {
    const updateClassroom = {...this.editClassroom}
    updateClassroom.status = updateClassroom.status ? 1 : 0
    this.apiService.postClassroom(updateClassroom).subscribe((responseData) => {
      console.log(responseData);
      this.router.navigate(['quan-tri/lop-hoc'])
    })
  }

  cancel() {

  }

}
