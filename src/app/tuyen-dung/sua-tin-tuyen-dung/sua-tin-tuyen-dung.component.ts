import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Recruit } from './../../../models/recruit.model';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'

@Component({
  selector: 'app-sua-tin-tuyen-dung',
  templateUrl: './sua-tin-tuyen-dung.component.html',
  styleUrls: ['./sua-tin-tuyen-dung.component.css']
})
export class SuaTinTuyenDungComponent implements OnInit {

  Editor = ClassicEditor
  id: string;
  editRecruit: Recruit = new Recruit()
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getEditRecruit(this.id)
    }
  }

  getEditRecruit(id: string) {
    this.apiService.getRecruitById(id).subscribe((responseData) => {
      this.editRecruit = responseData.data
      this.editRecruit.status = this.editRecruit.status == 1
      this.editRecruit.isHot = this.editRecruit.isHot == 1
      this.editRecruit.tags = (this.editRecruit.tags as string).split(',')
    })
  }

  onSubmit() {
    const updateRecruit = {...this.editRecruit}
    updateRecruit.status = updateRecruit.status ? 1 : 0
    updateRecruit.isHot = updateRecruit.isHot ? 1 : 0
    updateRecruit.tags = updateRecruit.tags.toString()

    this.apiService.postRecruit(updateRecruit).subscribe((responseData) => {
      console.log(responseData.message);
      this.router.navigate(['quan-tri/tuyen-dung'])
    })
  }

}
