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
  @Input() comments : Comment[] = [];
  defaultAvatar : string = "https://hochieuqua7.web.app/images/menu/account.png";
  commentAnswer : any = '';
  answerInput : any;
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
    // console.log(this.id);
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.comments.map(c => {
      c.createdDate = moment(c.createdDate).format('DD-MM-YYYY k:mm:ss');
      c.comments.map(c2 => {
        c2.createdDate = moment(c2.createdDate).format('DD-MM-YYYY k:mm:ss');
      })
    })
  }

  ngOnInit(): void {
  }

  displayAnswer(comment) {
    this.commentAnswer = comment.id;
  }

  sendAnswer() {
    const data = {...this.commentModel};
    data.content = this.answerInput;
    data.parentId = this.commentAnswer;
    data.screen = this.id;
    data.userId = this.userData.userId;
    data.status = 0;
    this.apiSerivce.postComment(data).subscribe(response => {
      console.log(response);
      
    })
  }

}
