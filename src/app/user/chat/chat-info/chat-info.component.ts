import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Conversation } from 'src/models/conversation.model';
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {
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
    this.apiService.postConversation(data).subscribe(response => {
      if(response.status == 'success') {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: response.data.messages})
        this.isChangeName = false;
      } else {
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: response.data.messages})
      }
    })
  }

  isChangeAvatar : boolean = false;
  changeAvatar() {
    this.isChangeAvatar = true;
  }

}
