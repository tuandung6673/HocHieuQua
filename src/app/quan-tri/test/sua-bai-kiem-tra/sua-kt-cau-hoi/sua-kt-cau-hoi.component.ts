import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Test } from 'src/models/test.model';

@Component({
  selector: 'app-sua-kt-cau-hoi',
  templateUrl: './sua-kt-cau-hoi.component.html',
  styleUrls: ['./sua-kt-cau-hoi.component.scss']
})
export class SuaKtCauHoiComponent implements OnInit, OnChanges {
  @Input() test : Test;
  constructor() { }

  ngOnInit(): void {
    console.log(this.test);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.test);
  }

}
