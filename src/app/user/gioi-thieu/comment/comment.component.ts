import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { Comment } from 'src/models/comment.model';
import { ApiService } from 'src/services/api.service.service';

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
  answerInput : string;
  newCommentContent : any = '';
  commentModel : Comment = new Comment();
  id : string;
  testId : string;
  constructor(
    private apiSerivce: ApiService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.testId = params['testId'];
    })    
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.getComment();
  }
  
  getComment() {
    this.spinner.show();
    this.apiSerivce.getComment(this.testId ? this.testId : this.id)
    .pipe(
      finalize(() => {
        this.spinner.hide()
      })
    )
    .subscribe(response => {
      this.comments = response.data.data;
      this.fetchTime();
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
    this.answerInput = "";
  }

  sendAnswer(hasParent : boolean = true) {
    let data = {...this.commentModel};
    if(hasParent) {
      data.parentId = this.commentAnswer;
      data.content = this.answerInput;
    } else {
      data.content = this.newCommentContent
    }
    data = {
      ...data,
      screen: this.testId ? this.testId : this.id,
      userId: this.userData.userId,
      status: 0,
    }
    this.apiSerivce.postComment(data).subscribe(response => {
      this.answerInput = "";
      this.newCommentContent = "";
      this.commentAnswer = '';
      if(response.status == 'success') {
        // this.spinner.show();
        // this.apiSerivce.getComment(this.id).subscribe(cmt => {
        //   this.comments = cmt.data.data;
        //   this.fetchTime();
        //   this.spinner.hide();
        // })
        this.getComment();
      }
    })
  }
}
