import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { CommentRealtime } from 'src/models/commentRealtime.model';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3'
import * as moment from 'moment';
import * as signalR from "@microsoft/signalr";
import { environment } from 'src/environments/environment';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-comment-realtime',
  templateUrl: './comment-realtime.component.html',
  styleUrls: ['./comment-realtime.component.scss']
})
export class CommentRealtimeComponent implements OnInit, AfterViewInit  {
  @ViewChild('scrollContainer', { static: false }) scrollContainer: ElementRef;
  userData = JSON.parse(localStorage.getItem('userData'))
  newCommentContent : any = '';
  realtimeComments : CommentRealtime[] = [];
  id : string;
  testId : string;
  query = {
    screen: '',
    offSet: 0,
    pageSize: 100,
    filter: ''
  };
  answerInput : string;
  commentAnswer : any = '';
  hubConnection: HubConnection;

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,  private apiSerivce: ApiService, ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.testId = params['testId'];
    })    
  }

  ngOnInit(): void {
    this.getComment();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.baseUrlRealtime}/commenthub`, )
      .build();
    const self = this
    this.hubConnection.start()
      .then(() => {
        self.hubConnection.invoke('AddUserToGroup', this.testId ? this.testId : this.id, this.userData.userId)
          // .then(() => console.log('AddUserToGroup'))
          .catch(err => console.error(err));
      })
      .catch(err => console.log('err', err))
    
    this.hubConnection.on("LeaveScreen", data => {
      // console.log('LeaveScreen', data);
    })

    this.hubConnection.on("JoinScreen", (data) => {
      // console.log('JoinScreen', data);
    });

    this.hubConnection.on("Comment", (screenId, comment, accountId, commentId, avatar, name, createdDate, parentId) => {
      const newCommnet = new CommentRealtime();
      newCommnet.id = commentId;
      newCommnet.accountId = accountId;
      newCommnet.accountName = name;
      newCommnet.accountAvatar = avatar;
      newCommnet.comment = comment;
      newCommnet.screen = screenId;
      newCommnet.parentComment = parentId;
      newCommnet.createdDate = createdDate;

      this.realtimeComments = [...this.realtimeComments, newCommnet]
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  sendAnswer(parentComment = '') {
    if(this.hubConnection) {
      this.hubConnection.invoke("SendComment", this.testId ? this.testId : this.id as any, this.newCommentContent, this.userData.userId, 'tano', parentComment)
        .then(() => {console.log('SendComment')})
        .catch(err => console.log('err', err))
    }
  }

  displayAnswer(comment) {
    this.commentAnswer = comment.id;
    this.answerInput = "";
  }

  getComment() {
    this.query.screen = this.testId ? this.testId : this.id;
    const queryParams = queryString.stringify(this.query)
    this.spinner.show();
    this.apiSerivce.getCommentRealtime(queryParams)
    .pipe(
      finalize(() => {
        this.spinner.hide()
      })
    )
    .subscribe(response => {
      this.realtimeComments = response.data.data;
      this.fetchTime();
    })
  }

  fetchTime() {
    this.realtimeComments.map(c => {
      c.createdDate = moment(c.createdDate).format('DD-MM-YYYY k:mm:ss');
      // c.comments.map(c2 => {
      //   c2.createdDate = moment(c2.createdDate).format('DD-MM-YYYY k:mm:ss');
      // })
    })
  }

}
