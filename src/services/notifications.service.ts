import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  http: HttpClient;
  private readonly url = "https://c2c-backend-dot-hu18-groupa-angular.et.r.appspot.com";

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  getNotifications(userId : number) {
    return this.http.get(this.url + "/notification/"+userId);
  }

  notificationViewed(notificationId:number) {
    return this.http.get(this.url + '/notification-view/'+ notificationId);
  }
}
