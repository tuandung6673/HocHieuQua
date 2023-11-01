import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Conversation } from 'src/models/conversation.model';

@Component({
  selector: 'app-chat-change-name',
  templateUrl: './chat-change-name.component.html',
  styleUrls: ['./chat-change-name.component.scss']
})
export class ChatChangeNameComponent implements OnInit, OnChanges {
  @Output() nameSaved = new EventEmitter<any>;
  @Input() chatSelected : Conversation;
  chatSelectedClone : Conversation = new Conversation();
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatSelected'] && this.chatSelected) {
      this.chatSelectedClone = {...this.chatSelected}
    }
  }

  onSubmit() {
    this.nameSaved.emit(this.chatSelectedClone);
  }

  cancel() {

  }

}
