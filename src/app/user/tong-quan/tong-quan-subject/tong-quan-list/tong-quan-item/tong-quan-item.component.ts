import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tong-quan-item',
  templateUrl: './tong-quan-item.component.html',
  styleUrls: ['./tong-quan-item.component.css']
})
export class TongQuanItemComponent implements OnInit {

  @Input() course 
  constructor() { }

  ngOnInit(): void {
  }

}
