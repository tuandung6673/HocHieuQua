import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Conversation } from 'src/models/conversation.model';
import * as queryString from 'querystring-es3'

@Component({
  selector: 'app-chat-file-media',
  templateUrl: './chat-file-media.component.html',
  styleUrls: ['./chat-file-media.component.scss']
})
export class ChatFileMediaComponent implements OnInit, OnChanges {
  @Input() chatSelected : Conversation;
  @Input() tabIndex : any = 0;
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

}
