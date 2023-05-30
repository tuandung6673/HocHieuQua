import { Component, Input, OnInit } from '@angular/core';
import { Test } from 'src/models/test.model';

@Component({
  selector: 'app-sua-kt-binh-luan',
  templateUrl: './sua-kt-binh-luan.component.html',
  styleUrls: ['./sua-kt-binh-luan.component.scss']
})
export class SuaKtBinhLuanComponent implements OnInit {
  @Input() test : Test;
  constructor() { }

  ngOnInit(): void {
  }
  

}
