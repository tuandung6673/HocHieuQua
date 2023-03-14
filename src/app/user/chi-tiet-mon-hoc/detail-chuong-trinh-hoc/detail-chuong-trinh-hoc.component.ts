import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-chuong-trinh-hoc',
  templateUrl: './detail-chuong-trinh-hoc.component.html',
  styleUrls: ['./detail-chuong-trinh-hoc.component.scss']
})
export class DetailChuongTrinhHocComponent implements OnInit {

  @Input() courseSchedules : any
  constructor() { }

  ngOnInit(): void {
  }

}
