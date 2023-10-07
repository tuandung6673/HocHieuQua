import { Component, OnInit } from '@angular/core';
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
export class CommentRealtimeComponent implements OnInit {
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
  hubConnection: HubConnection;

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute,  private apiSerivce: ApiService, ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.testId = params['testId'];
    })    
  }

  ngOnInit(): void {
    this.getComment();

    // const signalRInstant = new signalR.HubConnectionBuilder().withUrl(`${environment.baseUrl}/commenthub`).build();
  
    // signalRInstant.start()
    // .then(() => {
    //   signalRInstant.invoke('AddUserToGroup', this.testId ? this.testId : this.id, this.userData.userId)
    //   .then(() => {
    //     console.log('AddUserToGroup');
    //   })
    // })

    // signalRInstant.on("LeaveScreen", (data) => {
    //   console.log('LeaveScreen', data);
    // });

    // signalRInstant.on("JoinScreen", (data) => {
    //   console.log('JoinScreen', data);
    // });

    // signalRInstant.on("Comment", (screen, comment, accountId, accountName, commentId, avatar, name) => {
    //   const newCommnet = new CommentRealtime();
    //   newCommnet.id = commentId;
    //   newCommnet.accountId = accountId;
    //   newCommnet.accountName = name;
    //   newCommnet.accountAvatar = avatar;
    //   newCommnet.comment = comment;
    //   newCommnet.screen = screen;
    //   console.log(newCommnet, accountName);
    //   this.realtimeComments.push(newCommnet);     
    // })
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

    this.hubConnection.on("Comment", (screen, comment, accountId, accountName, commentId, avatar, name) => {
      const newCommnet = new CommentRealtime();
      newCommnet.id = commentId;
      newCommnet.accountId = accountId;
      newCommnet.accountName = name;
      newCommnet.accountAvatar = avatar;
      newCommnet.comment = comment;
      newCommnet.screen = screen;
      // console.log('newCommnet', newCommnet, accountName);                
      this.realtimeComments = [...this.realtimeComments, newCommnet]
  });
  }

  sendAnswer(hasParent : boolean = false, parentComment = '') {
    if(this.hubConnection) {
      this.hubConnection.invoke("SendComment", this.testId ? this.testId : this.id as any, this.newCommentContent, this.userData.userId, 'tano', parentComment)
        .then(() => {console.log('SendComment')})
        .catch(err => console.log('err', err))
    }
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
