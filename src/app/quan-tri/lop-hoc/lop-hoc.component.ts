import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-lop-hoc',
  templateUrl: './lop-hoc.component.html',
  styleUrls: ['./lop-hoc.component.scss']
})
export class LopHocComponent implements OnInit {
  
  constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService, private spinner: NgxSpinnerService) {
    document.title = "Lớp học"
  }

  defaultAvatar = 'https://imgt.taimienphi.vn/cf/Images/tt/2020/7/15/anh-dai-dien-facebook-y-nghia-cho-con-trai-26.jpg'
  classrooms : any
  search: string

  params = {
    filter: '',
    offSet: 0,
    pageSize: 5,
  }
  totalRecord : number = 0;


  ngOnInit(): void {
    this.getClassRooms();
  }

  getClassRooms() {
    this.spinner.show();
    this.apiService.getClassroom(this.params.offSet, this.params.pageSize, this.params.filter)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      this.classrooms = responseData.data.data;
      this.totalRecord = responseData.data.recordsTotal;
    })
  }

  onDeleteClassroom(id: string) {
    this.apiService.deleteClassroom(id).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: responseData.message})
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.message})
      }
      this.classrooms = this.classrooms.filter((classroom) => {
        return classroom.id != id
      })
    })
  }

  onSearch() {
    this.getClassRooms()
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getClassRooms();
  }

  confirmDeleteClassroom(id: string) {
    this.confirmationService.confirm({
      message: 'Bạn chắc chắn muốn xóa lớp học này',
      accept: () => {
        this.onDeleteClassroom(id)
      }
    })
  }

}
