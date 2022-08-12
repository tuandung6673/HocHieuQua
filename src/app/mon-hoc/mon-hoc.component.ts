import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Subject } from './../../models/subject.model';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mon-hoc',
  templateUrl: './mon-hoc.component.html',
  styleUrls: ['./mon-hoc.component.css']
})
export class MonHocComponent implements OnInit {

  courses: any
  subjects: any
  isLoading: boolean = false
  params = {
    offSet: 0,
    pageSize: 2,
    classId: '',
    filter: '',
    totalRecord: 0
  }

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getSubjects()
  }

  getSubjects() {
    this.apiService.getSubject(this.params.offSet, this.params.pageSize, this.params.classId, this.params.filter).subscribe((responseData) => {
      this.subjects = responseData.data.data.map((eachSubject) => {
        const classRooms = eachSubject.classRooms.map(t => t.name).toString();
        return {
          ...eachSubject,
          classRooms: classRooms
        }
      })
      this.params = {
        ...this.params,
        totalRecord: responseData.data.recordsTotal
      }
      this.isLoading = false
      console.log("Tat ca mon hoc", this.subjects);
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
      console.log('Delete Subject', responseData);
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
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
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
