import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Test } from 'src/models/test.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-sua-kt-cau-hoi',
  templateUrl: './sua-kt-cau-hoi.component.html',
  styleUrls: ['./sua-kt-cau-hoi.component.scss']
})
export class SuaKtCauHoiComponent implements OnInit, OnChanges {
  @Input() test : Test;
  isEdit : boolean = false;
  Editor = ClassicEditor;
  testOptions = [
    {label: 'Level 1', value: 1},
    {label: 'Level 2', value: 2},
    {label: 'Level 3', value: 3},
    {label: 'Level 4', value: 4},
    {label: 'Level 5', value: 5},
  ];
  quizzEdit : string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.test);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.test);
  }

  editQuizz(quizzId) {
    this.quizzEdit = quizzId;
    this.isEdit = true;
  }

}
