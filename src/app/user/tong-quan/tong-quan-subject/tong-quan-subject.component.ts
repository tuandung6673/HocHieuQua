import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tong-quan-subject',
  templateUrl: './tong-quan-subject.component.html',
  styleUrls: ['./tong-quan-subject.component.scss']
})
export class TongQuanSubjectComponent implements OnInit {

  @Input() subject
  constructor() { }

  ngOnInit(): void {
  }

}
