import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-chi-tiet-step',
  templateUrl: './chi-tiet-step.component.html',
  styleUrls: ['./chi-tiet-step.component.scss']
})
export class ChiTietStepComponent implements OnInit {

  id : string = "";
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.route.params.subscribe((params : Params) => {
      this.id = params['id']
    })
  }

  ngOnInit(): void {
    this.getEditStep();
  }

  getEditStep() {
    this.spinner.show();
    this.apiService.getStepById(this.id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      
    })
  }

}
