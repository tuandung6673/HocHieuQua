import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { Recruit } from 'src/models/recruit.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-tuyen-dung',
  templateUrl: './tuyen-dung.component.html',
  styleUrls: ['./tuyen-dung.component.css']
})
export class TuyenDungComponent implements OnInit {

  recruit : Recruit[] = []
  constructor(private apiService: ApiService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getRecruit()
  }

  getRecruit() {
    this.spinner.show()
    this.apiService.getRecruit().subscribe((responseData) => {
      this.recruit = responseData.data.data
      this.spinner.hide()
    })
  }
}
