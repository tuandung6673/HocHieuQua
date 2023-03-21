import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { Component, OnInit } from '@angular/core';
import { NewCatagory } from 'src/models/newCategory.model';

@Component({
  selector: 'app-sua-danh-muc',
  templateUrl: './sua-danh-muc.component.html',
  styleUrls: ['./sua-danh-muc.component.css']
})
export class SuaDanhMucComponent implements OnInit {

  id: string
  editNewCategory: NewCatagory = new NewCatagory()
  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getEditCategory(this.id);
    } else {
      document.title = "Thêm mới Danh mục Tin tức"
    }
  }

  getEditCategory(id: string) {
    this.apiService.getNewCategoryByid(id).subscribe((responseData) => {
      document.title = "Danh mục " + responseData.data.name;
      this.editNewCategory = responseData.data
      this.editNewCategory.status = this.editNewCategory.status == 1 
    })
  }

  onSubmit() {
    const updateNewCategory = {...this.editNewCategory}
    updateNewCategory.status = updateNewCategory.status ? 1 : 0
    console.log(updateNewCategory);
    this.apiService.postNewCategory(updateNewCategory).subscribe((responseData) => {
      console.log(responseData.message);
      this.router.navigate(['quan-tri/danh-muc-tin-tuc'])
    })
  }

  cancel() {
    
  }

}
