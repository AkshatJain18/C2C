import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  userDetails = JSON.parse(localStorage.user);
  unseenNotifications : boolean = false;
  notificationsOpened : boolean = false;
  myDate: string = "2021-05-04T12:54:20";
  notifications:any[] = [];

  constructor(private notificationsService: NotificationsService,private router:Router) { }

  ngOnInit(): void {
    this.notificationsService.getNotifications(this.userDetails.id)
    .subscribe(notificationsList =>
      {this.notifications = notificationsList;
      console.log(notificationsList);
      for(var i=0;i<this.notifications.length;i++) {
        if(!this.notifications[i].viewed) {
          this.unseenNotifications = true;
        }
      }});
  }

  openNotification(adId : number, notificationId:number) {
    this.notificationsOpened = !this.notificationsOpened;
    this.notificationsService.notificationViewed(notificationId)
    .subscribe(
      (res) => {
        const notification = this.notifications.find(n=> n.notificationId== notificationId);
        notification.viewed = true;
        console.log(notification);
      }
    );
    this.notificationsService.getNotifications(this.userDetails.id)
    .subscribe(notificationsList =>
      {this.notifications = notificationsList;
      console.log(notificationsList);
      for(var i=0;i<this.notifications.length;i++) {
        if(!this.notifications[i].viewed) {
          this.unseenNotifications = true;
        }
      }});
    this.router.navigateByUrl('ads/'+adId);
  }

}


