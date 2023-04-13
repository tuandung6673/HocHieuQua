import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Step } from 'src/models/step.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-chi-tiet-step',
  templateUrl: './chi-tiet-step.component.html',
  styleUrls: ['./chi-tiet-step.component.scss']
})
export class ChiTietStepComponent implements OnInit {

  editStep : Step = new Step();
  id : string = "";
  interfaceOption = [
    {label: 'Trắng', value: 'white-theme'},
    {label: 'Xanh', value: 'blue-theme'}
  ]
  screenOptions = [
    {label: 'Trang chủ', value: 'trang-chu'},
    {label: 'Tuyển dụng', value: 'tuyen-dung'}
  ]
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.route.params.subscribe((params : Params) => {
      this.id = params['id']
    })
  }

  ngOnInit(): void {
    if(this.id != 'them-moi') {
      this.getEditStep();
    } else {
      document.title = "Thêm mới Step"
    }
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
      document.title = response.data.name;
      this.editStep = response.data;
      this.editStep.status = this.editStep.status == 1;
      this.editStep.showNavigation = this.editStep.showNavigation == 1;
    })  
  }

  save() {
    const updateData : Step = {
      ...this.editStep,
      status: this.editStep.status ? 1 : 0,
      showNavigation: this.editStep.showNavigation ? 1 : 0,
    }
    this.spinner.show();
    this.apiService.postStep(updateData)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.message});
        this.router.navigate(['/quan-tri/step/0'])
      } else {
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.message});
      }
    })
  }

  cancel() {
    this.router.navigate(['/quan-tri/step/0'])
  }
}
