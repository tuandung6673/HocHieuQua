import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  faqs : any
  isLoading: boolean = false
  params = {
    offSet: 0,
    pageSize: 2,
    filter: '',
    totalRecord: 0
  }

  constructor(private apiService: ApiService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.getFAQs()
  }
  
  getFAQs() {
    this.apiService.getFAQ(this.params.offSet, this.params.pageSize, this.params.filter).subscribe((responseData) => {
      console.log(responseData.data.data);
      this.faqs = responseData.data.data
      this.params = {
        ...this.params,
        totalRecord: responseData.data.recordsTotal
      }
      this.isLoading = false
    })
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
      console.log('Delete FAQ', responseData);
      this.faqs = this.faqs.filter(faq => faq.id != id)
      console.log(this.faqs);
      
    })
  }

  confirmDeleteFAQ(id: string) {
    this.confirmationService.confirm({
        message: 'Bạn có muốn xóa giáo viên này ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
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
