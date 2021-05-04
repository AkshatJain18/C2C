import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = "https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com";

  constructor(private httpClient:HttpClient){

  }

  getUserById(id:any):Observable<any>{
    console.log("called!");
    return this.httpClient.get(this.url+"/users/"+id);
  }

  editProfile(data:any):Observable<any>{
    return this.httpClient.patch(this.url+"/user/update",data);
  }

  sendMail(data:any):Observable<any>{
    return this.httpClient.post('https://formspree.io/f/mwkavovy',data);
  }

}
