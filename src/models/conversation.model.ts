import { Account } from "./account.model";

export class Conversation {
    createdDate: string = "";
    modifiedDate: string = "";
    createdBy: string ="";
    modifiedBy: string ="";
    totalFiltered: any = 0;
    id: string ="";
    name: string ="";
    avatar: string ="";
    status: any = 0;
    screen: string ="";
    isPublic: any = 0;
    lastMessage: string ="";
    lastMessageDate:string = "";
    users: Account[] = [];
    accountId: string ="";
    conversationId: string ="";
    totalMember: any = 0
}