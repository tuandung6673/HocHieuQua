import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Recruit } from './../../../../models/recruit.model';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sua-tin-tuyen-dung',
  templateUrl: './sua-tin-tuyen-dung.component.html',
  styleUrls: ['./sua-tin-tuyen-dung.component.css']
})
export class SuaTinTuyenDungComponent implements OnInit {

  Editor = ClassicEditor
  id: string;
  editRecruit: Recruit = new Recruit()
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getEditRecruit(this.id);
      document.title = "Tuyển dụng"

    } else {
      document.title = "Thêm tin Tuyển dụng"
    }
  }

  getEditRecruit(id: string) {
    this.apiService.getRecruitById(id).subscribe((responseData) => {
      // document.title = "Tuyển dụng"
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
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary:'Thành công', detail: responseData.message})
        this.router.navigate(['quan-tri/tuyen-dung'])
      } else {
        this.messageService.add({severity: 'error', summary:'Thất bại', detail: responseData.message})
      }
    })
  }

  cancel() {
    this.router.navigate(['quan-tri/tuyen-dung'])
  }

}
