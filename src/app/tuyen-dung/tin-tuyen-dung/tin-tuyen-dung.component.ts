import { Component, OnInit } from '@angular/core';
import { Recruit } from 'src/models/recruit.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-tin-tuyen-dung',
  templateUrl: './tin-tuyen-dung.component.html',
  styleUrls: ['./tin-tuyen-dung.component.css']
})
export class TinTuyenDungComponent implements OnInit {

  recruits: Recruit[] = []
  isLoading: boolean = false
  params = {
    offSet: 0,
    pageSize: 2,
    filter: '',
    totalRecord: 0
  }
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {    
    this.getRecruit()
  }

  getRecruit() {
    this.isLoading = true
    this.apiService.getRecruit(this.params.offSet, this.params.pageSize, this.params.filter).subscribe((responseData) => {
      this.recruits = responseData.data.data
      console.log(this.recruits);
      this.params = {
        ...this.params,
        totalRecord: responseData.data.recordsTotal
      }
      this.isLoading = false
    })
  }

  paginate(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    this.params = {
      ...this.params,
      offSet: event.page * event.rows,
      pageSize: event.rows
    }
    this.getRecruit()
  }

}
