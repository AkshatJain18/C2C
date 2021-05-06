import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.scss']
})
export class MyAdsComponent implements OnInit {

  myAds:Ad[]=[];
  user!:User;
  isLoading:boolean=true;
  
  constructor(private adService:AdService,private dataService:DataService) { 
    this.user = JSON.parse(localStorage.getItem('user')!) as User;
  }

  deleteAd(adId:any,event:any){
    event.stopPropagation();
    this.adService.deleteAd(adId).subscribe((res)=>{
      this.myAds = this.myAds.filter(ad=>ad.adId!=adId);
    },
    (err)=>{
      alert("could not delete ad!");
      console.log(err);
    })
  }

  ngOnInit(): void {
    this.adService.getAds().subscribe((adList)=>{
      console.log(adList);
      console.log(this.user.id);
      this.myAds =  adList.filter((ad:Ad)=>ad.sellerId==this.user.id);
      this.isLoading = false;
      console.log(this.myAds);
    });
  }
}
