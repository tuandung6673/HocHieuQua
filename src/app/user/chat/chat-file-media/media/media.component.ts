import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Conversation } from 'src/models/conversation.model';
import * as queryString from 'querystring-es3'
import { ApiService } from 'src/services/api.service.service';
import { ConversationMessage } from 'src/models/convMessage.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnChanges {
  @Input() chatSelected : Conversation;
  imageList : ConversationMessage[] = [];
  query = {
    conversationId: '',
    filter: '',
    messageTypeId: 'image',
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
      this.getMedia();
    }
  }

  getMedia() {
    this.query.conversationId = this.chatSelected.conversationId;
    this.spinner.show();
    const queryParams = queryString.stringify(this.query);
    this.apiService.getConversationMessages(queryParams)
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe(response => {
      this.imageList = response.data.data;
    })
  }

}
