import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/models/ChatMessage';
import { User } from 'src/models/User';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages:any[] = [];
  message!:any;
  user!:User;
  chatId!:string;

  @Input()
  adId!:any;

  @Input()
  seller!:User;

  constructor(private chatService:ChatService) {
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
  }

  addMessage(){
    const chatMessage = {
      message : this.message,
      senderId : this.user.id,
      receiverId : this.seller.id,
      timestamp : new Date()+""
    };
    this.chatService.addMessage(this.adId+"",this.chatId,chatMessage);
  }

  fetchChatMessages(){
    this.chatService.getMessagesByChatId(this.chatId).subscribe(res=>{
      this.messages = res;
      this.messages.sort((x,y)=>new Date(x.timestamp).getTime()-new Date(y.timestamp).getTime());
      console.log(this.messages);
    });
  }

  ngOnInit(): void {
  
    if(this.seller.id = this.user.id){
      this.chatService.getAdChats(this.adId+"").subscribe((chats)=>{
        this.chatId = chats[0].chatId;
        this.fetchChatMessages();
      });
    }else{
      this.chatId = this.seller.id < this.user.id ? this.seller.id+"_"+this.user.id : this.user.id+"_"+this.seller.id;
      this.fetchChatMessages();
    }
  }

}
