import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Subject } from 'src/models/subject.model';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3';

@Component({
  selector: 'app-them-mon-hoc',
  templateUrl: './them-mon-hoc.component.html',
  styleUrls: ['./them-mon-hoc.component.scss']
})
export class ThemMonHocComponent implements OnInit {
  
  subjects : Subject[] = [];
  classId: string = '';
  display : boolean = false;
  filter : string = '';
  selectedSubject : Subject;
  filteredSubject : any;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private messageSerivice: MessageService, private spinner: NgxSpinnerService, private router: Router, private confirmationSerivce: ConfirmationService) {
    this.route.params.subscribe((params: Params) => {
      this.classId = params['id'];      
    })
  }

  ngOnInit(): void {
    this.getSubject();
  }

  getSubject() {
    this.spinner.show();
    this.apiService.getSubject(0, 100, this.classId)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      this.subjects = response.data.data;
    })
  }

  editSubject(id:string) {
    this.router.navigate(['/quan-tri/mon-hoc/', id], {queryParams: {classId : this.classId}})
  }

  searchSubject() {

  }

  filterCountry(e) {
    this.apiService.getSubject(0, 100, '', e.query).subscribe(response => {
      this.filteredSubject = response.data.data;
    })
  }

  addSubject() {
    const data = {classRoomId: this.classId, subjectId: this.selectedSubject.id};
    this.apiService.setClassroomSubject(data).subscribe(response => {
      if(response.status == 'success') {
        this.messageSerivice.add({severity:'success', summary: 'Thông báo', detail: response.data.messages});
        this.display = false;
        this.selectedSubject = null;
        this.getSubject();
      } else {
        this.messageSerivice.add({severity:'error', summary: 'Thông báo', detail: response.data.messages});
      }
    }) 
  }

  deleteSubject(subjectId) {
    this.confirmationSerivce.confirm({
      message: 'Bạn có chắc chắn muốn xóa môn học khỏi lớp này ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteSubjectFromClass(this.classId, subjectId).subscribe(reponse => {
          if(reponse.status == 'success') {
            this.messageSerivice.add({severity:'success', summary: 'Thông báo', detail: reponse.data.messages});
            this.subjects = this.subjects.filter(s => s.id != subjectId)
          } else {
            this.messageSerivice.add({severity:'error', summary: 'Thông báo', detail: reponse.data.messages});
          }
        })
      }
    })
  }

}
