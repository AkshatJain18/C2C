import { Unary } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { AuctionService } from 'src/services/auction.service';
import { CategoryService } from 'src/services/category.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-advertisement-detail',
  templateUrl: './advertisement-detail.component.html',
  styleUrls: ['./advertisement-detail.component.scss']
})
export class AdvertisementDetailComponent implements OnInit {

  adId!:string;
  ad!:Ad;
  seller!:User;
  category!:any;
  savedAds:Ad[]=[];
  user!:User;
  isLoggedIn: boolean;
  timeRemaining!:any;
  isAuction!:boolean;
  userBidPrice!:number;
  expectedBidPrice!:number;

  constructor(private adService:AdService,private userService:UserService,private categoryService:CategoryService,private auctionService:AuctionService,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.adId = params.get('adId') as string; 
    });
    this.isLoggedIn = localStorage.getItem('user')!=null;
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
    this.isAuction = false;
    this.userBidPrice = 0;
    this.expectedBidPrice = 0;
  }

  saveAd(ad:any){
    this.adService.saveAdForUser(ad.adId,this.user.id).subscribe((flag)=>{
      if(flag){
        this.savedAds.push(ad);
      }else{
        alert("ad could not be saved");
      } 
    });
  }

  unSaveAd(adId:any){
    this.adService.unsaveAdForUser(adId,this.user.id).subscribe((flag)=>{
      if(flag){
        this.savedAds = this.savedAds.filter(adItem=>adItem.adId!=adId);
      }else{
        alert("ad could not be unsaved");
      }
    });
  }

  bid(){
    if(this.userBidPrice>=this.expectedBidPrice){
      this.auctionService.bid(this.ad.adId,this.user.id,this.userBidPrice).subscribe((res)=>{
        console.log(res);
        this.ad.finalPrice = res.finalPrice;
      },(err)=>{
        console.log(err);
      })
    }
  }

  isAdSaved(adId:any){
    return this.savedAds.findIndex(ad=>ad.adId==adId)!=-1;
  }

  ngOnInit(): void {
    this.adService.getAdById(this.adId).subscribe(adItem => {
      this.ad = adItem;
      this.isAuction = this.ad.adType == 3;
      this.expectedBidPrice = (this.ad.finalPrice*110)/100;
      this.timeRemaining = Math.abs((new Date(this.ad.auctionDeadline).getTime()-new Date().getTime())/1000);
      this.categoryService.getCategories().subscribe((categories)=>{
         this.category =  categories.find((c:any)=>c.categoryId == this.ad.categoryId);
      })
      this.userService.getUserById(this.ad.sellerId).subscribe(userItem => this.seller = userItem);
    });

    //increase view count for this ad
    this.adService.postAdView(this.adId).subscribe();

    //fetching all the saved ads for the user
    this.userService.getSavedAdsByUserId(this.user.id).subscribe((savedAds)=>{
      this.savedAds = savedAds;
    });
  }
}
