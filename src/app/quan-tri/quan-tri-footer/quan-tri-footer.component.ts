import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Footer } from './../../../models/footer.model';
import { ExportService } from 'src/services/export.service';
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
    private exportService: ExportService
  ) { }
  footers : any[] = [];
  totalRecoed : number;

  ngOnInit(): void {
    this.getFooter();
  }

  getFooter() {
    this.spinner.show();
    this.apiService.getFooter().subscribe(response => {
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

  deleteFooter(id) {
    
  }

  // export() {
  //   this.exportService.exportExcel(JSON.stringify(this.footers), 'Quản lý Footer')
  // }

}
