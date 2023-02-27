import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Guide } from './../../../../models/guide.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-chi-tiet-tro-giup',
  templateUrl: './chi-tiet-tro-giup.component.html',
  styleUrls: ['./chi-tiet-tro-giup.component.scss']
})
export class ChiTietTroGiupComponent implements OnInit {

  Editor = ClassicEditor;
  screenOptions: any = [];
  editGuide : Guide = new Guide();
  id: string;
  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getGuideEdit(this.id)
    }
    this.screenOptions = [
      {label: 'Tất cả', value: ''},
      {label: 'Quản trị', value :'admin'},
      {label: 'Trang chủ', value: 'user'}
    ]
  }

  getGuideEdit(id: string) {
    this.apiService.getGuideById(id).subscribe(response => {
      this.editGuide = response.data;
    })
  }

  cancelBtn() {
    this.router.navigate(['quan-tri/tro-giup'])
  }

  postGuide() {
    const updateData = {...this.editGuide};
    this.apiService.postGuide(updateData).subscribe(response => {
      if(response.status == 'success') {
        this.message.add({severity: 'success', summary: 'Success', detail: response.message})
      }
      this.router.navigate(['quan-tri/tro-giup'])
    })
  }

}
