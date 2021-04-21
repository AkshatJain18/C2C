import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly url = "https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com";

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<any>{
    return this.httpClient.get(this.url + "/category");
  }
}
