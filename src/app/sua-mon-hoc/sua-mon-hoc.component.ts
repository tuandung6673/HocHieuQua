import { ApiService } from 'src/services/api.service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sua-mon-hoc',
  templateUrl: './sua-mon-hoc.component.html',
  styleUrls: ['./sua-mon-hoc.component.css']
})
export class SuaMonHocComponent implements OnInit {

  id: string
  editSubject: any

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id) {
      this.apiService.getSubjectById(this.id).subscribe((responseData) => {
        console.log('Subject By Id', responseData.data);
        this.editSubject = responseData.data
      })
    }
  }
}
