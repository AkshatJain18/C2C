import { Component, OnInit } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AwsCloudMapServiceDiscovery } from 'aws-sdk/clients/appmesh';
import { AdService } from 'src/services/ad.service';
import { Router } from '@angular/router';
import { Ad } from 'src/models/Ad';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  ads!:Ad[];
  isLoggedIn!:boolean;
  
  trendingAds:Ad[] = [];
  recentlyAddedAds:Ad[] = [];
  donationAds:Ad[] = [];

  categories:any = [];

  constructor(private adService:AdService,private categoryService:CategoryService,private router:Router) {  
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
      this.ads.forEach(ad=>this.trendingAds.push(ad));
      this.ads.forEach(ad=>this.recentlyAddedAds.push(ad));
      this.ads.forEach(ad=>this.donationAds.push(ad));

      this.trendingAds.sort((x,y)=>y.views-x.views);
      this.trendingAds = this.trendingAds.filter(ad=>ad.adType!=1);
      this.recentlyAddedAds.sort((x,y)=>new Date(y.adCreated).getTime()-new Date(x.adCreated).getTime());
      this.recentlyAddedAds = this.recentlyAddedAds.filter(ad=>ad.adType!=1);
      this.donationAds = this.donationAds.filter(ad=>ad.adType==1);
    });

    this.categoryService.getCategories().subscribe(
      (categoryList)=>{
        this.categories = categoryList;
        this.categories = this.categories.slice(0,5);
      },
      (error)=>{
        console.log(error);
      })
  }
}
