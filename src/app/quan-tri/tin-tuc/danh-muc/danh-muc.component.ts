import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { NewCatagory } from 'src/models/newCategory.model';
import { ApiService } from 'src/services/api.service.service';
import { finalize, pipe } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.scss']
})
export class DanhMucComponent implements OnInit {

  search: string
  newCategorys : NewCatagory[] = []
  params = {
    offSet: 0,
    pageSize: 5,
    filter: '',
    // status: -1
  }
  totalRecord: number
  
  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService, private spinner: NgxSpinnerService) {
    document.title = "Danh mục tin tức"
  }
  
  ngOnInit(): void {
    this.getNewCategorys()
  }

  getNewCategorys() {
    this.spinner.show();
    this.apiService.getNewCategory(this.params.offSet, this.params.pageSize, this.params.filter)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      this.newCategorys = responseData.data.data;
      this.totalRecord = responseData.data.recordsTotal
    })
  }

  onSearch() {
    this.getNewCategorys()
  }

  onDeleteNewCategory(id: string) {
    this.apiService.deleteNewCategory(id).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({summary: 'Thành công', severity: 'success', detail: responseData.message})
        this.newCategorys = this.newCategorys.filter(d => d.id != id)
      } else {
        this.messageService.add({summary: 'Thất bại', severity: 'error', detail: responseData.message})
      }
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
    this.getNewCategorys()
  }

  confirmDeleteNewCategory(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa love này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.onDeleteNewCategory(id)
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
