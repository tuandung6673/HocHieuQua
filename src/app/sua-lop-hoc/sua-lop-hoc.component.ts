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
  editClassroom: Classroom = new Classroom()

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true
    this.route.params.subscribe((param: Params) => {
      this.id = param['id']
    })
    this.getEditClassroom(this.id)
  }

  getEditClassroom(id: string) {
    if(this.id && this.id != "sua-lop-hoc") {
      this.apiService.getClassroomById(id).subscribe((responseData) => {
        console.log(responseData);
        this.editClassroom = responseData.data
        this.isLoading = false
      })
    } else {
      this.isLoading = false
    }
  }

  onSubmit() {
    const updateClassroom = {...this.editClassroom}
    updateClassroom.status = updateClassroom ? 1 : 0
    this.apiService.postClassroom(updateClassroom).subscribe((responseData) => {
      console.log(responseData);
      this.router.navigate(['quan-tri/lop-hoc'])
    })
  }

}
