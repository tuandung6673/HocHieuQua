import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import * as queryString from 'querystring-es3';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-mon-hoc',
  templateUrl: './mon-hoc.component.html',
  styleUrls: ['./mon-hoc.component.scss']
})
export class MonHocComponent implements OnInit {

  courses: any
  subjects: any
  search: string
  params = {
    offSet: 0,
    pageSize: 5,
    classId: '',
    filter: ''
  }
  classParams = {
    filter: '',
    offSet: 0,
    pageSize: 1000
  }
  totalRecord : number;
  classOption : any[]
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    document.title = "Môn học";
  }

  ngOnInit(): void {
    this.getSubjects();
    this.getClassroomForOption();
  }
  
  getSubjects() {
    this.spinner.show()
    this.apiService.getSubject(this.params.offSet, this.params.pageSize, this.params.classId, this.params.filter)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      this.subjects = responseData.data.data.map((eachSubject) => {
        const classRooms = eachSubject.classRooms.map(t => t.name).toString();
        return {
          ...eachSubject,
          classRooms: classRooms
        }
      })
      this.totalRecord = responseData.data.recordsTotal;
    })
  }

  onSearch() {
    this.getSubjects()
  }

  getClassroomForOption () {
    this.apiService.getClassroom().subscribe((response) => {
      this.classOption = response.data.data.map((a) => {
        return {label: a.name, value: a.id}
      })
      this.classOption = [{label: 'Tất cả', value: ''}, ...this.classOption]
    })
  }
 
  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getSubjects()
  }


  onDeleteSubject(id: string) {
    this.apiService.deleteSubject(id).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: responseData.message})
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.message})
      }
      this.subjects = this.subjects.filter((subject) => {
        return subject.id != id
      })
    })
  }

  confirmDeleteSubject(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa môn học này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.onDeleteSubject(id)
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
                default: 
                  return
            }
        }
    });
  }
}
