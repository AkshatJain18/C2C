import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = "https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com/users";

  constructor(private httpClient:HttpClient){

  }

  getUserById(id:any):Observable<any>{
    return this.httpClient.get(this.url+"/"+id);
  }

  getSavedAdsByUserId(userId:any):Observable<any>{
    return this.httpClient.get(this.url+"/"+userId+"/saved-ads");
  }
}
