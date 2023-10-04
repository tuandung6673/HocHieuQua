import { finalize } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ApiService } from 'src/services/api.service.service';
import { ExportService } from 'src/services/export.service';


@Component({
  selector: 'app-giao-vien',
  templateUrl: './giao-vien.component.html',
  styleUrls: ['./giao-vien.component.scss']
})
export class GiaoVienComponent implements OnInit {
  defaultAvatar = 'https://imgt.taimienphi.vn/cf/Images/tt/2020/7/15/anh-dai-dien-facebook-y-nghia-cho-con-trai-26.jpg'
  teachers: any
  search: string

  params = {
    offSet: 0,
    pageSize: 5,
    filter : '',
  }
  totalRecord: any

  constructor(
    private apiService: ApiService, private spinner: NgxSpinnerService,
    private confirmationService: ConfirmationService, private messageService: MessageService, private exportService: ExportService) {
      document.title = "Giáo viên";
    }

  ngOnInit(): void {
    this.getTeachers()
  }
  
  getTeachers() {
    this.spinner.show();
    this.apiService.getTeacher(this.params.offSet, this.params.pageSize, this.params.filter)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      }) 
    )
    .subscribe((responseData) => {
      this.teachers = responseData.data.data;
      this.totalRecord = responseData.data.recordsTotal;
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getTeachers()
  }

  onDeleteTeacher(id: string) {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa giáo viên này ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteTeacher(id).subscribe((responseData) => {
          if(responseData.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'Thành công', detail: responseData.data.messages})
          } else {
            this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.data.messages})
          }
          this.teachers = this.teachers.filter(teacher =>  teacher.id != id)
        })
      }
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
            this.onDeleteTeacher(id)
        }
    });
  }

  errorHandler(event) {
    event.target.src = this.defaultAvatar;
    event.target.style.objectFit = 'contain';
  }

  exportToExcel() {
    this.exportService.expoetExcel(this.teachers, 'DS_Giao_Vien')
  }
}

