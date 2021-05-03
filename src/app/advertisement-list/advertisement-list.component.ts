import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberAttributeValue } from 'aws-sdk/clients/clouddirectory';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { CategoryService } from 'src/services/category.service';
import { DataService } from 'src/services/data.service';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.scss']
})
export class AdvertisementListComponent implements OnInit {

  startPrice: number = 100;
  endPrice: number = 1000000;
  options: Options = {
    floor: 100,
    ceil: 100000,
    step: 2000,
    showTicks: true
  };

  adType:number;
  sortOption:number;

  user!:User;

  ads: Ad[] = [];
  selectedCategories:number[] = [];
  categories:any[] = [];
  searchKeyword:string = "";
  
  constructor(private adService:AdService,private categoryService:CategoryService,private searchService:SearchService,private router:Router,public dataService:DataService,private activatedRoute:ActivatedRoute) {
    this.adType = 2;
    this.sortOption = 1;
    this.user = JSON.parse(localStorage.getItem('user')!) as User;

    this.activatedRoute.paramMap.subscribe(params => {
      if(params.has('categoryId')){
        const categoryId = params.get('categoryId') as unknown as number; 
        this.selectedCategories.push(categoryId);
      }
    });
  }

  setAdType(adType:number){
    this.adType = adType;
  }

  setAdCard(ad:Ad){
    this.dataService.setAd(ad);
    return true;
  }

  addOrRemoveCategory(id:number){
    if(this.selectedCategories.findIndex(c=>c==id)==-1){
      this.selectedCategories.push(id);
    }else{
      this.selectedCategories = this.selectedCategories.filter(c=>c!=id);
    }
  }

  isCategorySelected(categoryId:number){
    return this.selectedCategories.findIndex(c=>c==categoryId)!=-1;
  }

  sortList(){
    if(this.sortOption==1){
      this.ads.sort((x,y)=>new Date(y.adCreated).getTime()-new Date(x.adCreated).getTime());
    }else{
      this.ads.sort((x,y)=>y.views-x.views);
    }
  }

  ngOnInit(): void {
    this.searchService.searchKeyword.subscribe(item => this.searchKeyword = item);
    this.adService.getAds().subscribe(adList => {
      this.ads = adList;this.ads.sort((x,y)=>new Date(y.adCreated).getTime()-new Date(x.adCreated).getTime());
    });
    this.categoryService.getCategories().subscribe(categoryList => this.categories = categoryList);
  }
}
