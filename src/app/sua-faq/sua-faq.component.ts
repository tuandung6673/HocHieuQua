import { ActivatedRoute, Route, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { FAQ } from 'src/models/faq.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'



@Component({
  selector: 'app-sua-faq',
  templateUrl: './sua-faq.component.html',
  styleUrls: ['./sua-faq.component.css']
})
export class SuaFaqComponent implements OnInit {

  Editor = ClassicEditor
  id: string = ''
  editFAQ : FAQ = new FAQ()
  isLoading: boolean = false

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    this.getEditFAQ(this.id)
  }

  getEditFAQ(id: string) {
    if(this.id && this.id != 'them-faq') {
      this.apiService.getFAQById(id).subscribe((responseData) => {
        this.editFAQ = responseData.data
        console.log(this.editFAQ);
        this.isLoading = false
      })
    } else {
      this.isLoading = false
    }
  }

  onSubmit() {
    const dataSave = {...this.editFAQ};
    dataSave.status = dataSave.status ? 1 : 0;
    this.apiService.postFAQ(dataSave).subscribe((responseData) => {
      console.log('Save FAQ', responseData);
      this.router.navigate(['quan-tri/faq'])
    })
  }
}
