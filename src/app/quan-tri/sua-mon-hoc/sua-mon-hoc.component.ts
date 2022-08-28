import { ApiService } from 'src/services/api.service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/models/subject.model';

@Component({
  selector: 'app-sua-mon-hoc',
  templateUrl: './sua-mon-hoc.component.html',
  styleUrls: ['./sua-mon-hoc.component.css']
})
export class SuaMonHocComponent implements OnInit {

  id: string
  editSubject: Subject = new Subject()
  optionsLopHoc: any = []
  isLoading: boolean = false

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.isLoading = true
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-mon-hoc') {
      this.getEditSubject(this.id)
    }
    this.getClassroomForOption();
  }

  getEditSubject (id: string) {
    this.isLoading = true
    this.apiService.getSubjectById(id).subscribe((responseData) => {
      console.log('Subject By Id', responseData.data);
      this.editSubject = responseData.data
      this.isLoading = false
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
    console.log('Save Btn');
    console.log(this.editSubject);
    
    const updateSubject = {...this.editSubject}
    updateSubject.status = updateSubject.status ? 1 : 0
    this.apiService.postSubject(updateSubject).subscribe((responseData) => {
      console.log(responseData);
      this.router.navigate(['quan-tri/mon-hoc'])
    })
  }
}
