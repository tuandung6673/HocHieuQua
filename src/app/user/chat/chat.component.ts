import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3'
import { finalize } from 'rxjs';
import { Conversation } from 'src/models/conversation.model';
import * as moment from 'moment'
import { ConversationMessage } from 'src/models/convMessage.model';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { MessageRequest } from 'src/models/messageRequest.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  accoundId = JSON.parse(localStorage.getItem('userData'))?.id;
  defaultAvatar = 'https://hochieuqua7.web.app/images/logo.png'
  query = {
    filter: '',
    offSet: 0,
    pageSize: 1000
  }
  messageQuery = {
    filter: '',
    offSet: 0,
    pageSize: 1000
  }
  conversationList : Conversation[] = [];
  isChildVisible : boolean = false;
  hoverConversation : string;
  messageList : MessageRequest[] = [];
  chatSelected : Conversation = new Conversation();
  isSelect : boolean = false;
  chatAnswer : any = null;
  hubConnection: HubConnection;

  constructor(
    private apiSerive: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getConversation();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.baseUrlRealtime}/chathub`)
      .build();
    const self = this
    this.hubConnection.start()
      .then(() => {
        self.hubConnection.invoke('PublishUserOnConnect', this.accoundId)
          .catch(err => console.error(err));
      })
      .catch(err => console.log('err', err))
    this.hubConnection.on("LeaveScreen", data => {
      // console.log('LeaveScreen', data);
    })

    this.hubConnection.on("JoinScreen", (data) => {
      // console.log('JoinScreen', data);
    });

    this.hubConnection.on("ReceiveDM", (somethingId, receiveChat) => {
      let chatInfo : MessageRequest = {...receiveChat};
      // chatInfo.content = chatInfo.messageTypeId == 'image' ? `https://tank8.bsite.net/images/${chatInfo.content}` : chatInfo.content;

      if(this.chatSelected.conversationId === chatInfo.conversationId) {
        this.messageList.push(chatInfo);
      }
      this.updateLastMessage(chatInfo.conversationId, chatInfo.content);
    })
  }

  updateLastMessage(conversationId, content) {
    const conv = this.conversationList.filter(conv => conv.conversationId == conversationId)[0];
    conv.lastMessage = content;
    // update order
    this.updateOrderMessage(conv)
  }
  
  updateOrderMessage(conv) {
    const indexOf = this.conversationList.indexOf(conv);
    const lastestConv = this.conversationList.splice(indexOf, 1)[0];
    this.conversationList.unshift(lastestConv);
  }

  getConversation() {
    this.spinner.show()
    const queryParams = queryString.stringify(this.query);
    this.apiSerive.getConversationUser(queryParams)
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe(response => {
      if(response.status == 'success') {
        this.conversationList = response.data.data;
        this.conversationList.map(t => {
          t.lastMessageDate = t.lastMessageDate ? moment(t.lastMessageDate).format('DD-MM-YYYY k:mm:ss') : '';
          if(!t.name) {
            t.name = `${t.users[0].name} (${t.users[0].userName})`
          }
        })
      }
    })
  }

  showChild(id) {
    this.isChildVisible = true;
    this.hoverConversation = id;
  }

  hideChild() {
    this.isChildVisible = false;
    this.hoverConversation = '';
  }

  errorHandler(event) {
    event.target.src = this.defaultAvatar;
    event.target.style.objectFit = 'contain';
  }
  
  selectChat(conv) {
    this.isSelect = true;
    this.chatSelected = conv;
    const queryParams = queryString.stringify({...this.messageQuery, ConversationId: conv.conversationId});
    this.apiSerive.getConversationMessages(queryParams).subscribe(response => {
      this.messageList = response.data.data;
      // this.messageList.forEach(msg => {
      //   msg.content = msg.messageTypeId == 'image' ? 'https://tank8.bsite.net/images/' + msg.content : msg.content;
      // })
    })
  }

  sendAnswer() {
    let answer = new MessageRequest();
    answer.conversationId = this.chatSelected.conversationId;
    answer.content = this.chatAnswer;
    answer.receiveAccountId = this.chatSelected.accountId;
    answer.senderAccountId = this.accoundId;
    answer.createdBy = this.accoundId;
    answer.messageTypeId = 'message';
    
    const listUser = this.chatSelected.users.map((user) => {
      return user.id
    }).join(',')

    if(this.hubConnection) {
      this.hubConnection.invoke("SendMessageToUser",
        JSON.stringify(answer),
        listUser
      )
      .then(() => {
        this.chatAnswer = '';
      })
      .catch(err => console.log('err', err));
    }
  }

}
