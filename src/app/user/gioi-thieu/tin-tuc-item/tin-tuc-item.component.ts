import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment'
@Component({
  selector: 'app-tin-tuc-item',
  templateUrl: './tin-tuc-item.component.html',
  styleUrls: ['./tin-tuc-item.component.css']
})
export class TinTucItemComponent implements OnInit {

  @Input() tintuc : any
  constructor() { }

  ngOnInit(): void {
    
  }

}
