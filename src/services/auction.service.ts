import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private readonly url = "https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com";

  constructor(private httpClient:HttpClient) {

  }

  bid(bidAdId:any,bidBuyerId:any,bidPrice:any):Observable<any>{
    return this.httpClient.post(this.url+"/bid",{bidAdId:bidAdId,bidBuyerId:bidBuyerId,bidPrice:bidPrice});
  }
}
