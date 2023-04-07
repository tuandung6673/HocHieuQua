import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService, ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Recruit } from 'src/models/recruit.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-tin-tuyen-dung',
  templateUrl: './tin-tuyen-dung.component.html',
  styleUrls: ['./tin-tuyen-dung.component.scss']
})
export class TinTuyenDungComponent implements OnInit {

  recruits: Recruit[] = []
  params = {
    offSet: 0,
    pageSize: 2,
    filter: '',
    totalRecord: 0
  }
  totalRecord : number = 0;
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,  
    private confirmationService: ConfirmationService
  ) {
    document.title = "Tuyển dụng"
  }

  ngOnInit(): void {    
    this.getRecruit()
  }

  getRecruit() {
    this.spinner.show()
    this.apiService.getRecruit(this.params.offSet, this.params.pageSize, this.params.filter)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      this.recruits = responseData.data.data
      this.totalRecord = responseData.data.recordsTotal
    })
  }

  deleteRecruit(id) {
    
  }

  onSearch() {
    this.getRecruit();
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
    this.getRecruit()
  }

}
