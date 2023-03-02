import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-tuyen-dung-item',
  templateUrl: './tuyen-dung-item.component.html',
  styleUrls: ['./tuyen-dung-item.component.scss']
})
export class TuyenDungItemComponent implements OnInit {

  @Input() tuyendung : any;
  dateConverted : any;
  constructor() { }

  ngOnInit(): void {
    const date = this.tuyendung.createdDate ;
    this.dateConverted = moment(date).format('DD-MM-YYYY k:mm:ss');
  }

}
