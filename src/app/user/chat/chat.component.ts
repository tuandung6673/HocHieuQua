import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3'
import { finalize } from 'rxjs';
import { Conversation } from 'src/models/conversation.model';
import * as moment from 'moment'
import { ConversationMessage } from 'src/models/convMessage.model';

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
  messageList : ConversationMessage[] = [];
  chatSelected : Conversation = new Conversation();
  isSelect : boolean = false;
  constructor(
    private apiSerive: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getConversation();
    console.log('chatSelected', this.chatSelected);
    
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
    })
  }

}
