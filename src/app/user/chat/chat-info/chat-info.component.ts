import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Conversation } from 'src/models/conversation.model';

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
  constructor() { }

  ngOnInit(): void {
  }

}
