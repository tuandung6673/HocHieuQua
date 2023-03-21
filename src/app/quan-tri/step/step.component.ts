import { Step } from './../../../models/step.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import * as queryString from 'querystring-es3';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  params = {
    filter: '',
    isParent: '',
    offSet: 0,
    pageSize: 10,
    screen: '',
    status: -1
  }
  steps : Step[] = [];
  totalRecord : number;
  data : any;
  constructor(
    private apiService: ApiService,
    private spinner : NgxSpinnerService
  ) {
    document.title = "Step"
  }

  ngOnInit(): void {
    this.getStep();
  }

  getStep() {
    const queryParams = queryString.stringify(this.params);
    this.spinner.show();
    this.apiService.getStep(queryParams).subscribe(response => {
      this.steps = response.data.data;
      this.totalRecord = response.data.recordsTotal;
      this.spinner.hide();
    })
  }

  onSearch() {
    this.getStep();
  }
}
