import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/models/ChatMessage';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  messagesCollection!: AngularFirestoreCollection<any>;
  adsCollection!:AngularFirestoreCollection<any>;
  
  constructor(private afs: AngularFirestore) { 
    this.messagesCollection = this.afs.collection<any>('chats');
    this.adsCollection = this.afs.collection<any>('ads');
  }

  getAdChats(adId:any){
    return this.adsCollection.doc(adId).collection<any>('chats').valueChanges(); 
  }

  getMessagesByChatId(chatId:string):Observable<any>{
    return this.messagesCollection.doc(chatId).collection<any>("messages").valueChanges();
  }

  addMessage(adId:any,chatId:string,chatMessage:any){
    this.adsCollection.doc(adId).collection<any>('chats').doc(chatId).set({chatId:chatId,lastUpdated:new Date()+""});
    this.adsCollection.doc(adId).collection<any>('chats').doc(chatId).set({chatId:chatId,lastUpdated:new Date()+""});

    this.messagesCollection.doc(chatId).collection<any>("messages").add(chatMessage);
  }
}
