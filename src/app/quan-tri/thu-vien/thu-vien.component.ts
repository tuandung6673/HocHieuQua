import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LibraryFolder } from 'src/models/libraryFolder.model';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-thu-vien',
  templateUrl: './thu-vien.component.html',
  styleUrls: ['./thu-vien.component.scss']
})
export class ThuVienComponent implements OnInit {

  constructor() {

  }
  
  ngOnInit(): void {
    
  }
}
