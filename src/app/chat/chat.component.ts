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
  chatCount!:number;
  isLoaded:boolean = false;

  constructor(private chatService:ChatService,private adService:AdService,private userService:UserService) {
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
    //this.isBuyer = this.user.id == chat.buyerId;
  }

  setCurrentChat(chat:any){
    this.currentChat = chat;
    if(!this.isChatSeenByUser(chat)){
      chat.seenBy.push(this.user.id);
      this.chatService.MarkChatSeenForUser(chat.chatId,this.user.id);
    }
  }

  isChatSeenByUser(chat:any){
    return chat.seenBy.findIndex((item:any)=>item==this.user.id)!=-1;
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

  fetchChats(){
    this.chatService.getChatsByUserId(this.user.id+"").subscribe((chatIdList)=>{
      this.chats = [];
      this.chatCount = chatIdList.length;

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

            const chat1:any = this.chats.find(c=>c.chatId==chat.chatId);

            if(chat1==null){
              this.chats.push(chat);
              itemsProcessed++;
            }else{
              this.currentChat = chat1;
              chat1.lastMessage = chat.lastMessage;
              chat1.lastUpdated = chat.lastUpdated;
              chat1.seenBy = chat.seenBy;  
              this.chats.sort((c1,c2)=>new Date(c2.lastUpdated).getTime()-new Date(c1.lastUpdated).getTime());
            }
            
            if(itemsProcessed == this.chatCount){
              this.chats.sort((c1,c2)=>new Date(c2.lastUpdated).getTime()-new Date(c1.lastUpdated).getTime());
              setTimeout(()=>{ 
                this.setCurrentChat(this.chats[0]);
                this.isLoaded = true;
                itemsProcessed = 0;
              }, 3000);
            }
            
          },(error)=>{
            console.log(error);
          })
        });
      });
    },(err)=>{
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.fetchChats();
  }
}
