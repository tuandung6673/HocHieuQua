import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { Test } from 'src/models/test.model';

@Component({
  selector: 'app-sua-bai-kiem-tra',
  templateUrl: './sua-bai-kiem-tra.component.html',
  styleUrls: ['./sua-bai-kiem-tra.component.scss']
})
export class SuaBaiKiemTraComponent implements OnInit {
  id: string = null;
  test : Test = new Test();
  commentConfiguration : any;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    });
    if(this.id && this.id != 'them-moi') {
      this.getTest(this.id);
    } else {
      document.title = "Thêm Bài kiểm tra";
    }
  }

  getTest(id) {
    this.spinner.show();
    this.apiService.getTestById(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((response) => {
      document.title = "Bài kiểm tra " + response.data.name;
      this.test = response.data;
      this.commentConfiguration = JSON.parse(response.data.commentConfiguration)
      this.test.isShowInAbilityTest = response.data.isShowInAbilityTest == 1 ? true : false;
      this.test.isAutoSendMail = response.data.isAutoSendMail == 1 ? true : false;
      this.test.status = response.data.status == 1 ? true : false;
      this.test.isFree = response.data.isFree == 1 ? true : false;
      this.spinner.hide();
      console.log(this.commentConfiguration);
      
    })
  }

  // getData(newData : Test) {
  //   const data : Test = {
  //     ...newData,
  //     testCategoryId: newData.testCategoryCode,
  //     isShowInAbilityTest: newData.isShowInAbilityTest ? 1 : 0,
  //     isAutoSendMail: newData.isAutoSendMail ? 1 : 0,
  //     status: newData.status ? 1 : 0,
  //     isFree: newData.isFree ? 1 : 0,
  //   }
  //   console.log(data);
  // }

  cancel() {

  }

  onSubmit() {
    const dataUpdate = {
      ...this.test,
      testCategoryId: this.test.testCategoryCode,
      isShowInAbilityTest: this.test.isShowInAbilityTest ? 1 : 0,
      isAutoSendMail: this.test.isAutoSendMail ? 1 : 0,
      status: this.test.status ? 1 : 0,
      isFree: this.test.isFree ? 1 : 0,
    }
    console.log(dataUpdate);
    
  }
}
