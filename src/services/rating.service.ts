import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private readonly url = "https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com";

  constructor(private httpClient:HttpClient) { }

  rateSeller(sellerId:any,rating:any):Observable<any>{
    return this.httpClient.post(this.url + "/users/rating", { userId: sellerId, ratings: rating });
  }

}
