import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Ad } from 'src/models/Ad';
import { ChatMessage } from 'src/models/ChatMessage';
import { User } from 'src/models/User';
import { ChatService } from 'src/services/chat.service';

@Component({
  selector: 'app-user-chat',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  messages:any[] = [];
  message!:any;
  user!:User;
  chatId!:string;

  isChatOpen:boolean = true;

  @Output() hideChatWindow = new EventEmitter<any>();

  @Input()
  ad!:Ad;

  @Input()
  seller!:User;

  constructor(private chatService:ChatService,private eRef: ElementRef) {
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
  }

  addMessage(){
    const chatMessage = {
      message : this.message,
      senderId : this.user.id,
      receiverId : this.seller.id,
      timestamp : new Date()+""
    };
    this.chatService.addMessage(this.ad.adId,this.user.id,this.seller.id,chatMessage);
    this.message = "";
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    if(this.eRef.nativeElement.contains(event.target)) {
      //clicked inside top nav
    } else {
      //clicked outside top nav
      this.isChatOpen = false;
    }
  }
  
  fetchChatMessages(){
    this.chatService.getMessagesByChatId(this.chatId).subscribe(res=>{
      this.messages = res;
      this.messages.sort((x,y)=>new Date(x.timestamp).getTime()-new Date(y.timestamp).getTime());
      console.log(this.messages);
    });
  }

  ngOnInit(): void {
    this.chatId = this.seller.id < this.user.id ? this.ad.adId+"_"+this.seller.id+"_"+this.user.id :  this.ad.adId+"_"+this.user.id+"_"+this.seller.id;
    this.fetchChatMessages();
  }

}
