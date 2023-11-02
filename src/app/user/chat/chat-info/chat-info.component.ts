import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Conversation } from 'src/models/conversation.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {
  @Output() updateAvatar = new EventEmitter<any>;
  @Output() updateName = new EventEmitter<any>;
  @Input() chatSelected : Conversation;
  memberItems: MenuItem[] = [
    {
      label: 'Rời nhóm',
      icon: 'pi pi-sign-out',
      command: () => {
        
      }
    }
  ]
  constructor(private apiService: ApiService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  isChangeName : boolean = false;
  changeName() {
    this.isChangeName = true;
  }

  saveName(data : Conversation) {
    data.id = this.chatSelected.conversationId;    
    this.apiService.postConversation(data).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.message})
        this.updateName.emit({convId: response.data.code, newName: data.name});
        this.isChangeName = false;
      } else {
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.message})
      }
    })
  }

  isChangeAvatar : boolean = false;
  changeAvatar() {
    this.isChangeAvatar = true;
  }

  saveAvatar(imgUrl) {
    const chatSelectedClone = {...this.chatSelected};
    chatSelectedClone.id = this.chatSelected.conversationId;
    chatSelectedClone.avatar = 'https://tank8.bsite.net/images/' + imgUrl;
    this.apiService.postConversation(chatSelectedClone).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.message})
        this.updateAvatar.emit({convId: response.data.code, newAvatar: imgUrl});
        this.isChangeAvatar = false;
      } else {
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.message})
      }
    })
  }

  isShowMedia : boolean = false;
  tabIndex : any;
  showMedia(tabIndex) {
    this.tabIndex = tabIndex;
    this.isShowMedia = true;
  }

}
