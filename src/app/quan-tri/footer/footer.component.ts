import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footer: any;
  footerLeft : any;;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getFooter()
  }

  getFooter() {
    this.apiService.getFooter().subscribe((responseData) => {
      this.footer = responseData.data.data;
    })
  }

}
