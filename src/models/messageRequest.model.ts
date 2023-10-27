export class MessageRequest {
    id : string = "";
    conversationId : string = "";
    receiveAccountId : string = "";
    senderAccountId : string = "";
    content : string = "";
    contentEdit : string = "";
    messageTypeId : string = "";
    status : number = 1;
    isForGroup : boolean = false;
    createdBy : string = '';
    createdDate : string = '';
    modifiedBy : string = '';
    modifiedDate : string = '';
    totalFiltered : string = null;
}