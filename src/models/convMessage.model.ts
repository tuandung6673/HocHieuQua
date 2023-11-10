export class ConversationMessage {
    createdDate: string ="";
    modifiedDate: string ="";
    createdBy: string ="";
    modifiedBy: string ="";
    totalFiltered: any = 0;
    id: string ="";
    conversationId: string ="";
    receiveAccountId: string ="";
    senderAccountId: string ="";
    senderAvatar : string = null;
    content: string ="";
    contentEdit: string ="";
    messageTypeId: string ="";
    status: any = 0;
    isForGroup: boolean = false;
}