import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tuyen-dung-item',
  templateUrl: './tuyen-dung-item.component.html',
  styleUrls: ['./tuyen-dung-item.component.scss']
})
export class TuyenDungItemComponent implements OnInit {

  @Input() tuyendung : any
  constructor() { }

  ngOnInit(): void {
  }

}
