import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { DataService } from 'src/services/data.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  soldAds:Ad[]= [];
  boughtAds:Ad[]= [];
  user:User;
  isSoldOpen:boolean = true;
  rate:number = 1;

  constructor(private dataService:DataService,private userService:UserService,private adService:AdService) { 
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
  }

  setAd(ad:Ad){
    this.dataService.setAd(ad);
    return true;
  }
  
  ngOnInit(): void {
    this.userService.getSoldAdsByUserId(this.user.id).subscribe((ads)=>{
      this.soldAds = ads;
    });

    this.userService.getBoughtAdsByUserId(this.user.id).subscribe((ads)=>{
      this.boughtAds = ads;
    });
  }
}
