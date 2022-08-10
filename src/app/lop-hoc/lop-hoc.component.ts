import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-lop-hoc',
  templateUrl: './lop-hoc.component.html',
  styleUrls: ['./lop-hoc.component.css']
})
export class LopHocComponent implements OnInit {

  classrooms : any
  isLoading: boolean = false

  constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.apiService.getClassroom().subscribe((responseData) => {
      console.log("Tat ca lop hoc", responseData.data.data);
      this.classrooms = responseData.data.data
      this.isLoading = false
    })
  }

  onDeleteClassroom(id: number) {
    this.apiService.deleteClassroom(id).subscribe((responseData) => {
      console.log(responseData);
      this.classrooms = this.classrooms.filter((classroom) => {
        return classroom.id != id
      })
    })
  }

  confirmDeleteClassroom(id: number) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa love này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
            this.onDeleteClassroom(id)
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
