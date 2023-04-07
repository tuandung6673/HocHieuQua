import { ActivatedRoute, Route, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { FAQ } from 'src/models/faq.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';



@Component({
  selector: 'app-sua-faq',
  templateUrl: './sua-faq.component.html',
  styleUrls: ['./sua-faq.component.css']
})
export class SuaFaqComponent implements OnInit {

  Editor = ClassicEditor
  id: string = ''
  editFAQ : FAQ = new FAQ()

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-faq') {
      this.getEditFAQ(this.id)
    } else {
      document.title = "Thêm Câu hỏi"
    }
  }

  getEditFAQ(id: string) {
    this.spinner.show();
    this.apiService.getFAQById(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      document.title = responseData.data.title;
      this.editFAQ = responseData.data;
      this.editFAQ.status = this.editFAQ.status == 1;
    })
  }

  onSubmit() {
    const dataSave = {...this.editFAQ};
    dataSave.status = dataSave.status ? 1 : 0;
    this.apiService.postFAQ(dataSave).subscribe((responseData) => {
      this.router.navigate(['quan-tri/faq'])
    })
  }

  cancel() {
    this.router.navigate(['quan-tri/faq'])
  }
}
