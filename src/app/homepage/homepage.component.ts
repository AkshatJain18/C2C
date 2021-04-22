import { Component, OnInit } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Advertisement } from 'src/models/Advertisement';
import { AwsCloudMapServiceDiscovery } from 'aws-sdk/clients/appmesh';
import { AdService } from 'src/services/ad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  ads!:Advertisement[];

  trendingAds!:Advertisement[];
  recentlyAddedAds!:Advertisement[];
  donationAds!:Advertisement[];
  
  constructor(config: NgbCarouselConfig,private adService:AdService,private router:Router) {  
    config.interval = 2500;  
    config.keyboard = false;  
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
  }  

  navigateToAllAds(){
    this.router.navigateByUrl('ads');
  }

  navigateToAdDetail(id:string){
    this.router.navigateByUrl('ads/'+id);
  }

  ngOnInit(): void {
    this.adService.getAds().subscribe(adList => {

      this.ads = adList
      this.trendingAds = this.ads;
      this.recentlyAddedAds = this.ads;
      this.donationAds = this.ads;

      this.trendingAds.sort((x,y)=>y.views-x.views);
      this.recentlyAddedAds.sort((x,y)=>new Date(y.adCreated).getTime()-new Date(x.adCreated).getTime());
      this.donationAds = this.donationAds.filter(ad=>ad.adType==3);
    });
  }

}
