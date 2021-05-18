import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { AuctionService } from 'src/services/auction.service';
import { DataService } from 'src/services/data.service';
import { createFalse } from 'typescript';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {

  myAds:Ad[]=[];
  user!:User;
  isLoading:boolean=true;
  
  constructor(private adService:AdService,private router:Router,private auctionService:AuctionService,private dataService:DataService) { 
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
  }

  stopPropogation(event:any){
    event.stopPropagation();
  }

  reconductAuction(adId:any){
    this.auctionService.reconductAuction(adId).subscribe((res)=>{
      alert("success!");
      this.router.navigateByUrl('/ads/'+adId);
    },(error)=>{
      console.log(error);
      alert("error occured!");
    })
  }

  editAd(adId:any,event:any){
    event.stopPropagation();
    this.router.navigateByUrl("/ads/update/"+adId);
  }

  isAuctionOver(ad:Ad){
    return new Date(ad.auctionDeadline)<new Date();
  }

  deleteAd(adId:any,event:any){
    event.stopPropagation();
    this.adService.deleteAd(adId).subscribe(()=>{
      this.myAds = this.myAds.filter(ad=>ad.adId!=adId);
    },
    (err)=>{
      this.myAds = this.myAds.filter(ad=>ad.adId!=adId);
      //console.log(err);
    })
  }

  ngOnInit(): void {
    this.adService.getAds().subscribe((adList)=>{
      this.myAds =  adList.filter((ad:Ad)=>ad.sellerId==this.user.id && ad.sold==false);
      this.isLoading = false;
    });
  }
}
