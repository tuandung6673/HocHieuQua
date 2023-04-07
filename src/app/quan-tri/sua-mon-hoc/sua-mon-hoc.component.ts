import { ApiService } from 'src/services/api.service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/models/subject.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-sua-mon-hoc',
  templateUrl: './sua-mon-hoc.component.html',
  styleUrls: ['./sua-mon-hoc.component.css']
})
export class SuaMonHocComponent implements OnInit {

  id: string
  editSubject: Subject = new Subject()
  optionsLopHoc: any = []
  defaultAvatar = 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-mon-hoc') {
      this.getEditSubject(this.id)
    } else {
      document.title = "Thêm môn học";
    }
    this.getClassroomForOption();
  }

  cancel() {

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
      this.editSubject = responseData.data
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
    updateSubject.status = updateSubject.status ? 1 : 0
    this.apiService.postSubject(updateSubject).subscribe((responseData) => {
      this.router.navigate(['quan-tri/mon-hoc'])
    })
  }
}
