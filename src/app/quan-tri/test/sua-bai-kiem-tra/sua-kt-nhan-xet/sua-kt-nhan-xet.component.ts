import { Component, Input, OnInit } from '@angular/core';
import { CommentConfigure } from 'src/models/commentConfigure.model';
import { Test } from 'src/models/test.model';

@Component({
  selector: 'app-sua-kt-nhan-xet',
  templateUrl: './sua-kt-nhan-xet.component.html',
  styleUrls: ['./sua-kt-nhan-xet.component.scss']
})
export class SuaKtNhanXetComponent implements OnInit {

  @Input() commentConfiguration;
  fromOptions = [];
  toOptions = [];
  newCommentConfigure : CommentConfigure = new CommentConfigure();
  // configure = []
  constructor() {

  }

  ngOnInit(): void {
    for(let i=0; i<100; i+=5) {
      this.fromOptions.push({label: `${i}%`, value: i == 0 ? -1 : i});
      this.toOptions.push({label: `${i+4}%`, value: i+4});
    }
    this.toOptions.splice(-1);
    this.toOptions.push({label: '100%', value: 100})
  }

  deleteComment(index) {
    this.commentConfiguration.splice(index, 1);   
  }

  newComment() {
    this.commentConfiguration.unshift({
      ...this.newCommentConfigure
    })
  }

  
}
