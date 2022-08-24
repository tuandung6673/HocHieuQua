import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-huong-dan-content',
  templateUrl: './huong-dan-content.component.html',
  styleUrls: ['./huong-dan-content.component.css']
})
export class HuongDanContentComponent implements OnInit {

  @Input() faq : any
  constructor() { }

  ngOnInit(): void {
  }

}
