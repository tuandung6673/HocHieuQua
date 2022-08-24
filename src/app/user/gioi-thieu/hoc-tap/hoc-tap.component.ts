import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hoc-tap',
  templateUrl: './hoc-tap.component.html',
  styleUrls: ['./hoc-tap.component.css']
})
export class HocTapComponent implements OnInit {

  @Input() newsCategory : any
  constructor() { }

  ngOnInit(): void {
  }

}
