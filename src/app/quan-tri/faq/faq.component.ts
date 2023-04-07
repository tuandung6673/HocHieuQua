import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs : any
  params = {
    offSet: 0,
    pageSize: 5,
    filter: ''
  }
  totalRecord: number = 0;

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getFAQs()
  }
  
  getFAQs() {
    this.spinner.show();
    this.apiService.getFAQ(this.params.offSet, this.params.pageSize, this.params.filter).subscribe((responseData) => {
      this.faqs = responseData.data.data
      this.params = {
        ...this.params,
      }
      this.totalRecord = responseData.data.recordsTotal
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getFAQs();
  }

  paginate(event) {
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getFAQs()
  }

  onDeleteFAQ (id: string) {
    this.apiService.deleteFAQ(id).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: responseData.message})
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: responseData.message})
      }
      this.faqs = this.faqs.filter(faq => faq.id != id)
    })
  }

  confirmDeleteFAQ(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa giáo viên này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.onDeleteFAQ(id)
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
