import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/notifications.service';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  userDetails = JSON.parse(localStorage.user);
  unseenNotifications: boolean = false;
  myDate: string = "2021-05-04T12:54:20";
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService,public dataService:DataService, private router: Router) { }

  ngOnInit(): void {
    this.notificationsService.getNotifications(this.userDetails.id)
      .subscribe(notificationsList => {
        this.notifications = notificationsList;
        this.unseenNotifications = this.notifications.includes((n:any)=>!n.viewed);
      });
  }

  openNotification(adId: number, notificationId: number) {
    this.notificationsService.notificationViewed(notificationId)
      .subscribe(
        (res) => {
          const notification = this.notifications.find(n => n.notificationId == notificationId);
          notification.viewed = true;
          console.log(notification);
        }
      );
    this.router.navigateByUrl('ads/' + adId);
    this.dataService.hideNotifications();
  }

}


