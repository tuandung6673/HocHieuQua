import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Teacher } from 'src/models/teacher.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-giao-vien',
  templateUrl: './giao-vien.component.html',
  styleUrls: ['./giao-vien.component.css']
})
export class GiaoVienComponent implements OnInit {

  teachers: any
  isLoading: boolean = false
  search: string

  params = {
    offSet: 0,
    pageSize: 2,
    filter : '',
    totalRecord: 0
  }

  constructor(private apiService: ApiService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTeachers()
  }
  
  getTeachers() {
    this.isLoading = true
    this.apiService.getTeacher(this.params.offSet, this.params.pageSize, this.params.filter).subscribe((responseData) => {
      console.log('Tat ca GV', responseData.data.data);
      this.teachers = responseData.data.data
      this.params = {
        ...this.params,
        totalRecord: responseData.data.recordsTotal
      }
      this.isLoading = false
    })
  }

  onSearch() {
    this.params = {
      ...this.params,
      filter: this.search
    }
    this.getTeachers()
  }

  onDeleteTeacher(id: string) {
    console.log(id);
    this.apiService.deleteTeacher(id).subscribe((responseData) => {
      console.log('Delete Teacher', responseData);
      this.teachers = this.teachers.filter(teacher =>  teacher.id != id)
      console.log(this.teachers);
    })
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    console.log(this.params);
    
    this.getTeachers();
  }

  confirmDeleteTeacher(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa giáo viên này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            this.onDeleteTeacher(id)
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
  }

}

