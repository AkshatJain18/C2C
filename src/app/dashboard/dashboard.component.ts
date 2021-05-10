import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { DataService } from 'src/services/data.service';
import { UserService } from 'src/services/user.service';
import { RatingService } from 'src/services/rating.service';

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
  nowRatedAds:Ad[] = [];

  constructor(private dataService:DataService,private ratingService:RatingService,private userService:UserService,private adService:AdService) { 
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
  }

  setAd(ad:Ad){
    this.dataService.setAd(ad);
    return true;
  }
  
  stopPropogation(event:any){
    event.stopPropagation();
  }

  onRateChange(adId:any,sellerId:any,sellerRating:number){
    this.ratingService.rateSeller(adId,sellerId,sellerRating).subscribe((res)=>{
      const ad:Ad = this.boughtAds.find(ad=>ad.adId==adId)!;
      ad!.rated = true;
      this.nowRatedAds.push(ad);
      console.log(res);
    },(error)=>{
      //alert("error!");
      console.log(error);
    })  
  }   

  isNowRated(adId:any){
    return this.nowRatedAds.findIndex(ad=>ad.adId==adId)!=-1;
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
