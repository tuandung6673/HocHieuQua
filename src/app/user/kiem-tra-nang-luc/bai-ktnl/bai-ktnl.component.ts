import { Quizz } from './../../../../models/quizz.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Test } from 'src/models/test.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-bai-ktnl',
  templateUrl: './bai-ktnl.component.html',
  styleUrls: ['./bai-ktnl.component.scss']
})
export class BaiKtnlComponent implements OnInit {

  test : Test;
  id :string;
  constructor(
    private activateRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((param : Params) => {
      this.id = param['id']
    })
    this.getTestById();
  }

  getTestById() {
    this.apiService.getTestById(this.id).subscribe(response => {
      this.test = response.data;
      console.log(JSON.parse(this.test.quizzs[2].quizzConfigSets));
    })
  }

}
