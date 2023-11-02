import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Conversation } from 'src/models/conversation.model';
import { ConversationMessage } from 'src/models/convMessage.model';
import { ApiService } from 'src/services/api.service.service';
import * as queryString from 'querystring-es3'
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  @Input() chatSelected : Conversation;
  linkList : ConversationMessage[] = [];
  query = {
    conversationId: '',
    filter: '',
    messageTypeId: 'link',
    offSet: 0,
    pageSize: 1000
  }
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatSelected'] && this.chatSelected) {
      this.getLink();
    }
  }

  getLink() {
    this.query.conversationId = this.chatSelected.conversationId;
    this.spinner.show();
    const queryParams = queryString.stringify(this.query);
    this.apiService.getConversationMessages(queryParams)
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe(response => {
      this.linkList = response.data.data;
    })
  }

  directUrl(fullContent) {
    const urlRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/g;
    const urls = fullContent.match(urlRegex);
    if(urls.length > 0) {
      urls.forEach(url => {
        window.open(url, '_blank');
      })
    }
  }
}
