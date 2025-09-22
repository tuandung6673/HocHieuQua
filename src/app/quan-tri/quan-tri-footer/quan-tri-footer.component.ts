import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as queryString from 'querystring-es3';
import { finalize } from 'rxjs';
import { ExportService } from 'src/services/export.service';
import { ApiService } from './../../../services/api.service.service';

@Component({
  selector: 'app-quan-tri-footer',
  templateUrl: './quan-tri-footer.component.html',
  styleUrls: ['./quan-tri-footer.component.scss']
})
export class QuanTriFooterComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private exportService: ExportService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    document.title = "Footer"
  }
  query = {
    filter: '',
    pageSize: 5,
    offSet: 0
  }
  footers : any[] = [];
  totalRecoed : number;

  ngOnInit(): void {
    this.getFooter();
  }

  getFooter() {
    const queryParams = queryString.stringify(this.query)
    this.spinner.show();
    this.apiService.getFooter(queryParams).subscribe(response => {
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

  export() {
    // this.exportService.expoetExcel({ jsonData: JSON.stringify(this.footers) as any, fileName: 'Quản lý Footer' })
  }

  exportToExcel() {
    const exportData = this.footers.map((item) => {
      const {id, ...dataWithoutId} = item;
      return dataWithoutId
    })
    this.exportService.expoetExcel(exportData, 'footer');
  }

}
