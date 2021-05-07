import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { DataService } from 'src/services/data.service';
import { NavbarService } from 'src/services/navbar.service';
import { NotificationsService } from 'src/services/notifications.service';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  searchKeyword!:string;
  ads!:Ad[];
  user!:User;
  isSearchInputVisible!:boolean;
  isLoggedIn!:boolean;
  isMenuOpen!:boolean;
  isNotificationsOpen!:boolean;
  unseenNotifications!: boolean;

  constructor(private adService:AdService,public dataService:DataService,private notificationService:NotificationsService,private searchService:SearchService,private router:Router,private eRef: ElementRef) {
    this.isLoggedIn = localStorage.getItem('user')!=null;
    this.isMenuOpen = false;
    this.isNotificationsOpen = false;
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
    this.unseenNotifications = false;
  }

  search(){
    if(this.searchKeyword==""){
      return;
    }
    const index = this.ads.findIndex(
      ad => ad.productName.toLowerCase().includes(this.searchKeyword)
    );
    if(index!=-1){
      this.router.navigateByUrl('/ads');
    }
  }

  onLogOutClick(){
    localStorage.clear();
  }

  onCreateAdClick(){
    if(this.isLoggedIn){
      this.router.navigateByUrl('/create-ad');
    }else{
      this.router.navigateByUrl('/sign-in');
    }
  }

  updateKeyword(){
    this.searchService.setKeyword(this.searchKeyword);
    this.search();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any; }) {
    if(this.eRef.nativeElement.contains(event.target)) {
      //clicked inside top nav
    } else {
      //clicked outside top nav
      this.isMenuOpen = false;
      this.isNotificationsOpen = false;
    }
  }
  
  closePopUps(){
    this.isMenuOpen = false;
    this.isNotificationsOpen = false;
  }

  ngOnInit(): void {
    this.adService.getAds().subscribe((list : Ad[])=>{
      this.ads = list;
    });

    this.notificationService.getNotifications(this.user.id)
    .subscribe(notificationsList => {
      console.log(notificationsList);
      this.unseenNotifications = notificationsList.findIndex((n:any)=>!n.viewed)!=-1;
      this.dataService.setUnseenNotifications(this.unseenNotifications);
    });
  }

}
