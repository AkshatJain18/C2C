import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient;

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
   }

   signIn(data: any): Observable<any> {
    return this.http.post("https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com/login",data);
   }

   signUp(data: any): Observable<any> {
     return this.http.post("https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com/signup",data);
   }

   MustMatch(p:any,cp:any){
     return true;
   }
}
