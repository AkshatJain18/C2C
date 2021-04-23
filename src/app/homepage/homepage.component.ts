import { Component, OnInit } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AwsCloudMapServiceDiscovery } from 'aws-sdk/clients/appmesh';
import { AdService } from 'src/services/ad.service';
import { Router } from '@angular/router';
import { Ad } from 'src/models/Ad';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  ads!:Ad[];
  isLoggedIn!:boolean;

  trendingAds!:Ad[];
  recentlyAddedAds!:Ad[];
  donationAds!:Ad[];
  
  constructor(private adService:AdService,private router:Router) {  
    this.isLoggedIn = localStorage.getItem('user')!=null;
  }  

  navigateToAllAds(){
    this.router.navigateByUrl('ads');
  }

  navigateToAdDetail(id:number){
    this.router.navigateByUrl('ads/'+id);
  }

  ngOnInit(): void {
    this.adService.getAds().subscribe(adList => {

      this.ads = adList;
      this.trendingAds = this.ads;
      this.recentlyAddedAds = this.ads;
      this.donationAds = this.ads;

      this.trendingAds.sort((x,y)=>y.views-x.views);
      this.recentlyAddedAds.sort((x,y)=>new Date(x.adCreated).getTime()-new Date(y.adCreated).getTime());
      this.donationAds = this.donationAds.filter(ad=>ad.adType==3);
    });
  }
}