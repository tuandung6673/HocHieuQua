import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import TinyMCE from 'src/common/constants/tiny.constant';
import { Notification } from 'src/models/notification.model';
import { ApiService } from './../../../../services/api.service.service';

@Component({
  selector: 'app-chi-tiet-thong-bao',
  templateUrl: './chi-tiet-thong-bao.component.html',
  styleUrls: ['./chi-tiet-thong-bao.component.scss']
})
export class ChiTietThongBaoComponent implements OnInit {
  id : string;
  editNoti : Notification = new Notification()
  editorConfig = TinyMCE;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private messageService : MessageService
  ) {
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
    if(this.id && this.id != 'them-moi') {
      this.getDetail();
    }
  }

  getDetail() {
    this.spinner.show();
    this.apiService.getNotificationById(this.id).subscribe(response => {
      this.editNoti = response.data; 
      this.spinner.hide();
    })
  }

  cancel() {
    this.router.navigate(['/quan-tri/thong-bao'])
  }
  
  save() {
    const data = this.editNoti;
    this.apiService.postNotification(data).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Cập nhật thông báo thành công'});
        this.router.navigate(['/quan-tri/thong-bao'])
      } else {
        this.messageService.add({severity: 'error', summary: 'Thất bại', detail: 'Cập nhật thông báo thất bại'});
      }
    })
  }

}
