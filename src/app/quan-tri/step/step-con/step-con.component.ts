import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { Step } from 'src/models/step.model';
import { ApiService } from './../../../../services/api.service.service';
import TinyMCE from 'src/common/constants/tiny.constant';

@Component({
  selector: 'app-step-con',
  templateUrl: './step-con.component.html',
  styleUrls: ['./step-con.component.scss']
})
export class StepConComponent implements OnInit {
  editorConfig = TinyMCE
  Editor = ClassicEditor;
  stepChild : Step = new Step();
  childId : string = '';
  parentId : string = '';
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.route.params.subscribe((params : Params) => {
      this.childId = params['id'];
    })
    this.route.queryParams.subscribe(params => {
      this.parentId = params?.parentId;
    })
  }

  ngOnInit(): void {
    if(this.childId && this.childId != 'them-moi') {
      this.getStepChild();
    }
  }

  getStepChild() {
    this.spinner.show();
    this.apiService.getStepById(this.childId)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(response => {
      this.stepChild = response.data;
      this.stepChild.status = this.stepChild.status == 1;
    })
  }

  save() {
    const updateData = {
      ...this.stepChild,
      isParent: this.parentId,
      status: this.stepChild.status ? 1 : 0
    }
    this.spinner.show();
    this.apiService.postStep(updateData)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe(repsonse => {
      if(repsonse.status == 'success') {
        this.messageService.add({severity: 'success' ,summary: 'Thông báo', detail: repsonse.message});
        this.router.navigate(['/quan-tri/step/0']);
      } else {
        this.messageService.add({severity: 'error' ,summary: 'Thông báo', detail: repsonse.message});
      }
    })
  }

  cancel() {
    this.router.navigate(['/quan-tri/step/0']);
  }
}
