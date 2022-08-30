import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comments : any
  defaultAvatar : string = "https://hochieuqua7.web.app/images/menu/account.png"
  constructor() { }

  ngOnInit(): void {
  }

}
