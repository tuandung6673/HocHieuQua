import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-item',
  templateUrl: './teacher-item.component.html',
  styleUrls: ['./teacher-item.component.css']
})
export class TeacherItemComponent implements OnInit {
  @Input() teacher
  constructor() { }

  ngOnInit(): void {
  }

}
