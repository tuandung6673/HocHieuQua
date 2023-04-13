import { Step } from './../../../models/step.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import * as queryString from 'querystring-es3';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';

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
    private spinner : NgxSpinnerService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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

  routerChildStep(id : string, parentId: string) {
    this.router.navigate(['/quan-tri/step/1', id], {queryParams: {parentId: parentId}})
  }

  newChildStep(parentId) {
    this.router.navigate(['/quan-tri/step/1', 'them-moi'], {queryParams: {parentId: parentId}})
  }

  deleteStep(id : string, isChild : boolean = false) {
    this.confirmationService.confirm({
      message: `Bạn có chắc chắn xóa Step ${isChild ? 'con' : 'cha'} này ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.spinner.show();
        this.apiService.deleteStep(id)
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe(response => {
          if(response.status == 'success') {
            this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.data.messages});
            if(!isChild) {
              this.steps = this.steps.filter(s => s.id != id);
            } else {
              this.getStep();
            }
          } else {
            this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.data.messages});
          }
        })
      }
    })
  }
}
