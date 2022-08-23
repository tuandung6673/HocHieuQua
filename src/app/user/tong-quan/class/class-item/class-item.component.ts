import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.css']
})
export class ClassItemComponent implements OnInit {

  @Input() class
  constructor() { }

  ngOnInit(): void {
  }

}
