import { Router } from '@angular/router';
import { Footer } from './../../../../models/footer.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Subject } from './../../../../models/subject.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-footer',
  templateUrl: './chi-tiet-footer.component.html',
  styleUrls: ['./chi-tiet-footer.component.scss']
})
export class ChiTietFooterComponent implements OnInit {

  Editor = ClassicEditor;
  footerId: string;
  footer : Footer = new Footer();

  constructor(
    private route : ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.footerId = params['id']
    })
    if(this.footerId && this.footerId != 'them-ung-vien') {
      this.getFooterById();
    } else {
      document.title = "Thêm mới Footer"
    }
  }

  getFooterById() {
    this.spinner.show();
    this.apiService.getFooterById(this.footerId).subscribe((response) => {
      document.title = "Footer " + response.data.title;
      this.footer = response.data as Footer; 
      // console.log(response.data);
      
      this.footer.status = this.footer.status == 1;
      this.spinner.hide()
    })
  }

  cancel() {
    this.router.navigate(["/"])
  }

  save() {
    const data = {...this.footer};
    data.status = data.status ? 1 : 0;
    this.apiService.postFooter(data).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'success', detail: 'Cập nhật Footer thành công'})
        this.router.navigate(['/quan-tri/footer'])
      } else {
        this.messageService.add({severity: 'success', summary: 'success', detail: 'Cập nhật Footer thất bại'})
      }
    })
  }

}
