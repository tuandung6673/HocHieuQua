import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Footer } from './../../../models/footer.model';
import { ExportService } from 'src/services/export.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-quan-tri-footer',
  templateUrl: './quan-tri-footer.component.html',
  styleUrls: ['./quan-tri-footer.component.scss']
})
export class QuanTriFooterComponent implements OnInit {
  query = {
    filter: '',
    pageSize: 5,
    offSet: 0
  }

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private exportService: ExportService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    document.title = "Footer"
  }
  footers : any[] = [];
  totalRecoed : number;

  ngOnInit(): void {
    this.getFooter();
  }

  getFooter() {
    this.spinner.show();
    this.apiService.getFooter(0, 10, this.query.filter).subscribe(response => {
      this.footers = response.data.data;
      this.totalRecoed = response.data.recordsTotal;
      this.spinner.hide();
    })  
  }
  
  paginate(event) {
    this.query = {
      ...this.query,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }    
    this.getFooter();
  }

  onSearch() {
    this.getFooter();
  }

  deleteFooter(id) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa Footer này?',
      header: 'Xác nhận',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.apiService.deleteFooter(id)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe(response => {
          if(response.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.data.messages});
            this.footers = this.footers.filter(f => f.id != id);
          } else {
            this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.data.messages});
          }
        })
      }
    })  
  }

  // export() {
  //   this.exportService.exportExcel(JSON.stringify(this.footers), 'Quản lý Footer')
  // }

}
