import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import TinyMCE from 'src/common/constants/tiny.constant';
import { New } from 'src/models/new.model';
import { ApiService } from 'src/services/api.service.service';
import { ChonAnhComponent } from '../../thu-vien/chon-anh/chon-anh.component';


@Component({
  selector: 'app-sua-bai-viet',
  templateUrl: './sua-bai-viet.component.html',
  styleUrls: ['./sua-bai-viet.component.css']
})
export class SuaBaiVietComponent implements OnInit {
  editorConfig = TinyMCE;
  defaultAvatar = 'https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg'
  id: string
  editNew : New = new New()
  newCategoryOption : any
  constructor(private messageService: MessageService, private dialogService: DialogService, private apiService: ApiService ,private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getEditNews(this.id);
    } else {
      document.title = "Thêm mới Tin tức"
    }
    this.getNewCategoryOption()
  }

  getEditNews(id: string) {
    this.spinner.show();
    this.apiService.getNewsById(id)
    .pipe(
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe((responseData) => {
      document.title = "Tin tức " + responseData.data.title;
      this.editNew = responseData.data
      if(this.editNew.tags == "") {
        this.editNew.tags = null
      } else {
        this.editNew.tags = (this.editNew.tags as string).split(',');
      }
      this.editNew.status = this.editNew.status == 1 ;
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
    updateNews.status = updateNews.status ? 1 : 0;
    updateNews.tags = updateNews.tags.toString();

    this.apiService.postNews(updateNews).subscribe((responseData) => {
      if(responseData.status == 'success') {
        this.messageService.add({severity: 'success', summary:'Thành công', detail: responseData.message})
        this.router.navigate(['quan-tri/tin-tuc']);
      } else {
        this.messageService.add({severity: 'error', summary:'Thất bại', detail: responseData.message})
      }
    })
  }


  cancel() {
    this.router.navigate(['quan-tri/tin-tuc']);
  }

  ref: DynamicDialogRef;
  uploadImage(field) {
    this.ref = this.dialogService.open(ChonAnhComponent, {
      header: 'Thư viện ảnh',
      width: '90%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((imgUrl) => {
      if(imgUrl) {
        this.editNew = {
          ...this.editNew,
          [field]: "https://tank8.bsite.net/images/" + imgUrl 
        }
      } else {
        return;
      }
    })
  }
}
