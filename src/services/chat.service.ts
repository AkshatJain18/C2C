import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Ad } from 'src/models/Ad';
import { ChatMessage } from 'src/models/ChatMessage';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatsCollection!: AngularFirestoreCollection<any>;
  usersCollection!:AngularFirestoreCollection<any>;
  
  constructor(private afs: AngularFirestore) { 
    this.chatsCollection = this.afs.collection<any>('chats');
    this.usersCollection = this.afs.collection<any>('users');
  }

  getChatById(chatId:string){
    return this.chatsCollection.doc(chatId).valueChanges();
  }

  getChatsByUserId(userId:string){
    return this.usersCollection.doc(userId).collection<any>('chats').valueChanges();
  }

  getMessagesByChatId(chatId:string):Observable<any>{
    console.log(chatId);
    return this.chatsCollection.doc(chatId).collection<any>('messages').valueChanges();
  }

  addMessage(adId:any,buyerId:any,sellerId:any,message:any){
    let chatId = ""+adId;
    if(buyerId<sellerId){
      chatId = chatId+"_"+buyerId+"_"+sellerId;
    }else{
      chatId = chatId+"_"+sellerId+"_"+buyerId;
    }
    const chat = {
      chatId:chatId,
      adId:adId,
      lastUpdated:new Date()+"",
      lastMessage:message,
      buyerId : buyerId,
      sellerId : sellerId,
    }
    this.chatsCollection.doc(chatId).set(chat).then((res)=>{
      this.usersCollection.doc(buyerId+"").collection<any>('chats').doc(chatId).set({chatId:chatId});
      this.usersCollection.doc(sellerId+"").collection<any>('chats').doc(chatId).set({chatId:chatId});
      this.chatsCollection.doc(chatId).collection<any>('messages').add(message);
    });
  }
}
