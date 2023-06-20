import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { TestUser } from 'src/models/testUser.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {
  @Input() test : any
  @Input() index : any
  testForm : TestUser = new TestUser();
  testId: string;
  display : boolean = false;
  display2 : boolean = false;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  getTestCode() {
    const data = {
      ...this.testForm,
      testId: this.test.id,
      userId: JSON.parse(localStorage.getItem('userData')).userId
    }
    this.spinner.show();
    this.apiService.postTestUser(data)
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe(response => {
      if(response.status == 'success') {
        const testCode = response.data.code;
        localStorage.setItem('testCode', testCode)
        if(testCode == '-1') {
          this.display = true;
        } else {
          this.router.navigate(['kiem-tra-nang-luc', this.test.id])
          // this.display2 = true;
        }
      }
    })
  }
} 
