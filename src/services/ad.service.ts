import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Advertisement } from 'src/models/Advertisement';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  private readonly url = "https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com/ads";
  
  constructor(private httpClient:HttpClient) {

  }

  getAds():Observable<any>{
    return this.httpClient.get(this.url);
  }

  getAdById(id:String):Observable<any>{
    return this.httpClient.get(this.url+"/"+id);
  }

  postAdView(id:string){
    return this.httpClient.get(this.url+"/"+id+"/update-view");
  }
}
