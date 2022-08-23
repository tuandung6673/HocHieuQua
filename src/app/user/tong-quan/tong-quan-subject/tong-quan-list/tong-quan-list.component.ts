import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tong-quan-list',
  templateUrl: './tong-quan-list.component.html',
  styleUrls: ['./tong-quan-list.component.css']
})
export class TongQuanListComponent implements OnInit {

  @Input() subject
  constructor() { }

  ngOnInit(): void {
  }

}
