import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import * as queryString from 'querystring-es3';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conversation } from 'src/models/conversation.model';
import { MessageRequest } from 'src/models/messageRequest.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollContainer', { read: ElementRef }) scrollContainer: ElementRef;
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
  showAddAccount : boolean = false;
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

    this.hubConnection.on("ReceiveDM", (data : {connectionId: string, message: MessageRequest}) => {
      const { connectionId, message } = data;
      let chatInfo : MessageRequest = {...message};
      
      if(this.chatSelected.conversationId === chatInfo.conversationId) {
        const chatUser = this.conversationList.filter(item => item.conversationId == chatInfo.conversationId)[0].users;
        this.messageList.push({...chatInfo, senderAvatar: chatUser.filter(it => it.id == chatInfo.senderAccountId)[0].avatar});
        this.scrollToBottom();
      }

      // play audio sound
      if (message.senderAccountId != this.accoundId) {
        const audioElement = <HTMLAudioElement>document.getElementById('notiSound');
        audioElement.play();
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
            const nameDafault = t.users.filter(item => item.id != this.accoundId)[0];
            t.name = `${nameDafault.name} (${nameDafault.userName})`
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
  
  selectChat(conv, isAddNew = false) {
    if(isAddNew) {
      this.conversationList.unshift(conv);
    }
    this.isSelect = true;
    this.chatAnswer = '';
    this.chatSelected = conv;
    const queryParams = queryString.stringify({...this.messageQuery, ConversationId: conv.conversationId});
    this.spinner.show();
    this.apiSerive.getConversationMessages(queryParams)
    .pipe(
      finalize(() => {
        this.spinner.hide(),
        setTimeout(() => {
          this.scrollToBottom()
        }, 100)
      })
    )
    .subscribe(response => {
      this.messageList = response.data.data;
      const chatUser = this.conversationList.filter(item => item.conversationId == conv.conversationId)[0].users;
      this.messageList.forEach(item => {
        item.senderAvatar = chatUser.filter(it => it.id == item.senderAccountId)[0].avatar;
      })
    })
  }

  sendAnswer() {
    let answer = new MessageRequest();
    answer.conversationId = this.chatSelected.conversationId;
    answer.content = this.chatAnswer;
    answer.receiveAccountId = this.chatSelected.accountId;
    answer.senderAccountId = this.accoundId;
    answer.createdBy = this.accoundId;

    // tam thoi fix cung type la message
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

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  showMedia : boolean = false;
  openMedia() {
    this.showMedia = !this.showMedia;
  }

  updateName({convId, newName}) {
    this.conversationList.forEach(conv => {
      if(conv.conversationId == convId) {
        conv.name = newName;
      }
    })
  }

  updateAvatar({convId, newAvatar}) {
    this.conversationList.forEach(conv => {
      if(conv.conversationId == convId) {
        conv.avatar = 'https://tank8.bsite.net/images/' + newAvatar;
      }
    })
  }

  showCreateMessage : boolean = false;
  createMessage() {
    this.showCreateMessage = true;
  }

  getNewIdMultiUser(listAccount) {
    if(listAccount.length == 1) {
      const params = {receiveAccountId : listAccount.map(item => item.id).join(',')};
      const queryParams = queryString.stringify(params);
      this.spinner.show();
      this.apiSerive.setConversationSingleUser(queryParams)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe(response => {
        if(response.status == 'success') {
          this.createGroupChat(response.data, listAccount)
        }
      })
    } else {
      const params = {receiveAccountIds : listAccount.map(item => item.id).join(',')};
      const queryParams = queryString.stringify(params);
      this.apiSerive.setConversationMultipleUser(queryParams).subscribe(response => {
        if(response.status == 'success') {
          this.createGroupChat(response.data, listAccount)
        }
      })
    }
  }

  createGroupChat(newId, listAccount) {
    const id = newId;
    const newName = null;
    const newAvatar = null;
    const newAccountId = listAccount.map(item => item.id).join(',')

    if(this.hubConnection) {
      this.hubConnection.invoke("CreateGroupChat", id, newName, newAvatar, newAccountId)
      .then(() => {
        // this.getConversation();
        this.addNewChat(newId, listAccount);
        this.showCreateMessage = false;
      })
    }
  }

  addNewChat(chatId, listAccount) {
    this.apiSerive.getConversation(chatId).subscribe(response => {
      if(response.status == 'success') {
        if(this.conversationList.some(item => item.conversationId == chatId)) {
          const oldChat = this.conversationList.filter(item => item.conversationId == chatId)[0];
          this.selectChat(oldChat);
        } else {
          const nameDefault = listAccount.filter(item => item.id != this.accoundId)[0]?.name;
          this.selectChat({...response.data, name: nameDefault, conversationId: response.data.id}, true)
        }
      }
    })
  }
  
}