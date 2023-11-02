import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConversationMessage } from 'src/models/convMessage.model';
import { Conversation } from 'src/models/conversation.model';
import * as queryString from 'querystring-es3'
import { ApiService } from 'src/services/api.service.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit, OnChanges {
  @Input() chatSelected : Conversation;
  fileList : ConversationMessage[] = [];
  query = {
    conversationId: '',
    filter: '',
    messageTypeId: 'file',
    offSet: 0,
    pageSize: 1000
  }
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatSelected'] && this.chatSelected) {
      this.getFile();
    }
  }

  getFile() {
    this.query.conversationId = this.chatSelected.conversationId;
    const queryParams = queryString.stringify(this.query);
    this.apiService.getConversationMessages(queryParams).subscribe(response => {
      this.fileList = response.data.data;
    })
  }

}
