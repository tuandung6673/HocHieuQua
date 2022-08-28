// import { New } from './../../../models/new.model';
import { New } from 'src/models/new.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'


@Component({
  selector: 'app-sua-bai-viet',
  templateUrl: './sua-bai-viet.component.html',
  styleUrls: ['./sua-bai-viet.component.css']
})
export class SuaBaiVietComponent implements OnInit {

  Editor = ClassicEditor
  isLoading: boolean = false
  id: string
  editNew : New = new New()
  newCategoryOption : any
  constructor(private apiService: ApiService ,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getEditNews(this.id)
    }
    this.getNewCategoryOption()
  }

  getEditNews(id: string) {
    this.isLoading = true
    this.apiService.getNewsById(id).subscribe((responseData) => {
      this.editNew = responseData.data
      this.editNew.tags = (this.editNew.tags as string).split(',')
      this.editNew.status = this.editNew.status == 1
      this.isLoading = false
    })  
  }

  getNewCategoryOption() {
    this.apiService.getNewCategory().subscribe((responseData) => {
      this.newCategoryOption = responseData.data.data.map((newCategory => {
        return {name: newCategory.name, code: newCategory.id}
      }))
    })
  }

  onSubmit() {
    const updateNews = {...this.editNew};
    updateNews.status = updateNews.status ? 1 : 0
    updateNews.tags = updateNews.tags.toString()

    // console.log(updateNews);
    
    this.apiService.postNews(updateNews).subscribe((responseData) => {
      console.log(responseData.message);
      this.router.navigate(['quan-tri/tin-tuc'])
    })
  }

}
