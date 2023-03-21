import { FAQ } from './../../../models/faq.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-huong-dan',
  templateUrl: './huong-dan.component.html',
  styleUrls: ['./huong-dan.component.css']
})
export class HuongDanComponent implements OnInit {

  title: string;
  content: string;
  faqSelected : string;
  FAQs : FAQ[] = []
  isDisplayContent: boolean = false
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) {
    document.title = "Hướng dẫn"
  }

  ngOnInit(): void {
    this.getFAQ()
  }


  getFAQ() {
    this.spinner.show()
    this.apiService.getFAQ().subscribe((responseData) => {
      this.FAQs = responseData.data.data
      this.faqSelected = responseData.data.data[0].id;
      this.content = responseData.data.data[0].content
      this.title = responseData.data.data[0].title
      this.spinner.hide()
    })
  }

  onSelect(faq) {
    this.isDisplayContent = true
    this.faqSelected = faq.id
    this.title = faq.title
    this.content = faq.content
  }

}
