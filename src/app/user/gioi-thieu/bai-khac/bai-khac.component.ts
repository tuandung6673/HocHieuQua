import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bai-khac',
  templateUrl: './bai-khac.component.html',
  styleUrls: ['./bai-khac.component.css']
})
export class BaiKhacComponent implements OnInit {
  @Input() mostViewNew : any
  @Input() lastestNew : any
  constructor() { }

  ngOnInit(): void {
  }

}
