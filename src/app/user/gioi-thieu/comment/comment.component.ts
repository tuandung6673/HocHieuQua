import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment'
import { Comment } from 'src/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnChanges {

  userData = JSON.parse(localStorage.getItem('userData'))
  comments : Comment[] = [];
  defaultAvatar : string = "https://hochieuqua7.web.app/images/menu/account.png";
  commentAnswer : any = '';
  answerInput : any;
  newCommentContent : any = '';
  commentModel : Comment = new Comment();
  id;
  constructor(
    private apiSerivce: ApiService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })    
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.spinner.show();
    this.apiSerivce.getComment(this.id).subscribe(response => {
      this.comments = response.data.data;
      this.fetchTime();
      this.spinner.hide();
    })
  }

  fetchTime() {
    this.comments.map(c => {
      c.createdDate = moment(c.createdDate).format('DD-MM-YYYY k:mm:ss');
      c.comments.map(c2 => {
        c2.createdDate = moment(c2.createdDate).format('DD-MM-YYYY k:mm:ss');
      })
    })
  }

  displayAnswer(comment) {
    this.commentAnswer = comment.id;
  }

  sendAnswer(hasParent : boolean = true) {
    const data = {...this.commentModel};
    if(hasParent) {
      data.parentId = this.commentAnswer;
      data.content = this.answerInput;
    } else {
      data.content = this.newCommentContent
    }
    data.screen = this.id;
    data.userId = this.userData.userId;
    data.status = 0;
    this.apiSerivce.postComment(data).subscribe(response => {
      this.answerInput = "";
      this.newCommentContent = "";
      this.commentAnswer = '';
      if(response.status == 'success') {
        this.spinner.show();
        this.apiSerivce.getComment(this.id).subscribe(cmt => {
          this.comments = cmt.data.data;
          this.fetchTime();
          this.spinner.hide();
        })
      }
    })
  }

}
