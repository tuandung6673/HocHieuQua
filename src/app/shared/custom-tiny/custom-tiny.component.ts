import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-tiny',
  templateUrl: './custom-tiny.component.html',
  styleUrls: ['./custom-tiny.component.scss']
})
export class CustomTinyComponent implements OnInit {
  @Input() value: any = ''
  @Output() callback = new EventEmitter<any>;
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount'
  }
  constructor() { }

  ngOnInit(): void {
  }

  changeValue(data) {
    this.callback.emit(this.value)
  }

}
