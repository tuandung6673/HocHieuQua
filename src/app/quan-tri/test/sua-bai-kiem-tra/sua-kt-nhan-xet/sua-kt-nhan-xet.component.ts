import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sua-kt-nhan-xet',
  templateUrl: './sua-kt-nhan-xet.component.html',
  styleUrls: ['./sua-kt-nhan-xet.component.scss']
})
export class SuaKtNhanXetComponent implements OnInit {

  @Input() commentConfiguration = "abc";
  constructor() { }

  ngOnInit(): void {
    console.log(this.commentConfiguration);
    // this.getConfigure()
  }
}
