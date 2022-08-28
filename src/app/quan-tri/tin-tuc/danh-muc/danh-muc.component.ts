import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { NewCatagory } from 'src/models/newCategory.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.css']
})
export class DanhMucComponent implements OnInit {

  isLoading: boolean = false
  search: string
  newCategorys : NewCatagory[] = []
  params = {
    offSet: 0,
    pageSize: 2,
    filter: '',
    totalRecord: 0
  }
  
  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService) { }
  
  ngOnInit(): void {
    this.getNewCategorys()
  }

  getNewCategorys() {
    this.isLoading = true
    this.apiService.getNewCategory(this.params.offSet, this.params.pageSize, this.params.filter).subscribe((responseData) => {
      this.newCategorys = responseData.data.data
      console.log(this.newCategorys);
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
    this.getNewCategorys()
  }

  onDeleteNewCategory(id: string) {
    this.apiService.deleteNewCategory(id).subscribe((responseData) => {
      console.log(responseData.message);
      this.newCategorys = this.newCategorys.filter(d => d.id != id)
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
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
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
