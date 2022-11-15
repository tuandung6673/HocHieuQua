import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-item',
  templateUrl: './teacher-item.component.html',
  styleUrls: ['./teacher-item.component.scss']
})
export class TeacherItemComponent implements OnInit {
  @Input() teacher
  constructor() { }

  ngOnInit(): void {
  }

}
