import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { DataService } from 'src/services/data.service';
import { UserService } from 'src/services/user.service';
import { RatingService } from 'src/services/rating.service';
import { AuctionService } from 'src/services/auction.service';
import { Router } from '@angular/router';

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

  constructor(private dataService:DataService,private router:Router,private auctionService:AuctionService,private ratingService:RatingService,private userService:UserService,private adService:AdService) { 
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
  }

  setAd(ad:Ad){
    this.dataService.setAd(ad);
    return true;
  }
  
  stopPropogation(event:any){
    event.stopPropagation();
  }

  reconductAuction(adId:any){
    this.auctionService.reconductAuction(adId).subscribe((res)=>{
      alert("Auction restarted!");
      this.router.navigateByUrl('/ads/'+adId);
    },(error)=>{
      console.log(error);
      alert("error occured!");
    })
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
