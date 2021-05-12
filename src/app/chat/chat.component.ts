import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin } from 'rxjs';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user!:User;
  chats:any[] = [];
  isBuyer!:boolean;
  currentChat!:any;
  message!:string;

  constructor(private chatService:ChatService,private adService:AdService,private userService:UserService) {
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
    //this.isBuyer = this.user.id == chat.buyerId;
  }

  setCurrentChat(chat:any){
    this.currentChat = chat;
  }

  addMessage(){
    let receiverId = this.user.id==this.currentChat.sellerId?this.currentChat.buyerId:this.currentChat.sellerId;
    const chatMessage = {
      message : this.message,
      senderId : this.user.id,
      receiverId : receiverId,
      timestamp : new Date()+""
    };

    this.chatService.addMessage(this.currentChat.adId,this.currentChat.buyerId,this.currentChat.sellerId,chatMessage);
    this.message = "";
  }

  ngOnInit(): void {
    console.log(this.user);
    this.chatService.getChatsByUserId(this.user.id+"").subscribe((chatIdList)=>{
      //this.chats = [];
      var itemsProcessed = 0;
      chatIdList.forEach(item=>{
        this.chatService.getChatById(item.chatId).subscribe((chat)=>{
          combineLatest([
            this.userService.getUserById(chat.buyerId),
            this.userService.getUserById(chat.sellerId),
            this.adService.getAdById(chat.adId),
            this.chatService.getMessagesByChatId(chat.chatId)
          ])
          .subscribe(([buyer,seller,ad,messages])=>{
            chat.buyer = buyer;
            chat.seller = seller;
            chat.ad = ad;

            messages = messages.sort((c1:any,c2:any)=>new Date(c1.timestamp).getTime()-new Date(c2.timestamp).getTime());
            chat.messages = messages;
            this.chats = this.chats.filter(c=>c.chatId!=chat.chatId);

            console.log(chat);
            this.chats.push(chat);

            itemsProcessed++;
            if(itemsProcessed === chatIdList.length) {
              
              this.chats.sort((c1,c2)=>new Date(c2.lastUpdated).getTime()-new Date(c1.lastUpdated).getTime());
            }
          })
        });
      });
    },(err)=>{
      console.log(err);
    });
  }

}
