import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-giao-vien',
  templateUrl: './giao-vien.component.html',
  styleUrls: ['./giao-vien.component.css']
})
export class GiaoVienComponent implements OnInit {

  teachers: any
  isLoading: boolean = false

  constructor(private apiService: ApiService, private router: Router,
    private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.apiService.getTeacher().subscribe((responseData) => {
      console.log('Tat ca GV', responseData.data.data);
      this.teachers = responseData.data.data
      this.isLoading = false
    })
  }

  onDeleteTeacher(id: number) {
    console.log(id);
    this.apiService.deleteTeacher(id).subscribe((responseData) => {
      console.log('Delete Teacher', responseData);
      this.teachers = this.teachers.filter(teacher =>  teacher.id != id)
      console.log(this.teachers);
    })
  }

  confirmDeleteTeacher(id: number) {
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

