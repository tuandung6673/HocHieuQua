import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gioi-thieu-phai',
  templateUrl: './gioi-thieu-phai.component.html',
  styleUrls: ['./gioi-thieu-phai.component.css']
})
export class GioiThieuPhaiComponent implements OnInit {

  @Input() newsCategory : any
  @Input() mostViewNew : any
  @Input() lastestNew : any
  constructor() { }

  ngOnInit(): void {
  }

}
