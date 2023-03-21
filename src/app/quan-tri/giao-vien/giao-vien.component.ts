import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ApiService } from 'src/services/api.service.service';


@Component({
  selector: 'app-giao-vien',
  templateUrl: './giao-vien.component.html',
  styleUrls: ['./giao-vien.component.scss']
})
export class GiaoVienComponent implements OnInit {

  teachers: any
  isLoading: boolean = false
  search: string

  params = {
    offSet: 0,
    pageSize: 5,
    filter : '',
  }
  totalRecord: any

  constructor(private apiService: ApiService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
      document.title = "Giáo viên";
    }

  ngOnInit(): void {
    this.getTeachers()
  }
  
  getTeachers() {
    this.isLoading = true
    this.apiService.getTeacher(this.params.offSet, this.params.pageSize, this.params.filter).subscribe((responseData) => {
      this.teachers = responseData.data.data;
      this.totalRecord = responseData.data;
      this.isLoading = false
    })
  }

  onSearch() {
    this.getTeachers()
  }

  onDeleteTeacher(id: string) {
    this.apiService.deleteTeacher(id).subscribe((responseData) => {
      this.teachers = this.teachers.filter(teacher =>  teacher.id != id)
    })
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }    
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
        }
    });
  }

}

