import { Router } from '@angular/router';
import { Footer } from './../../../../models/footer.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.footerId = params['id']
    })
    this.getFooterById();
  }

  getFooterById() {
    // this.spinner.show();
    this.apiService.getFooterById(this.footerId).subscribe((response) => {
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

  }

}
