import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/models/Ad';
import { AdService } from 'src/services/ad.service';
import { CategoryService } from 'src/services/category.service';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.scss']
})
export class AdvertisementListComponent implements OnInit {

  startPrice: number = 50;
  endPrice: number = 10000000;
  options: Options = {
    floor: 100,
    ceil: 1000000,
    step: 1000,
    showTicks: true
  };

  adType:number;
  sortOption:number;

  ads: Ad[] = [];
  selectedCategories:number[] = [];
  categories:any[] = [];
  searchKeyword:string = "";
  
  constructor(private adService:AdService,private categoryService:CategoryService,private searchService:SearchService,private router:Router) {
    this.adType = 2;
    this.sortOption = 1;
    this.sortList();
  }

  setAdType(adType:number){
    this.adType = adType;
  }

  addOrRemoveCategory(id:any){
    if(!this.selectedCategories.includes(id)){
      this.selectedCategories.push(id);
    }else{
      this.selectedCategories = this.selectedCategories.filter(c=>c!=id);
    }
    console.log(this.selectedCategories);
  }

  sortList(){
    if(this.sortOption==1){
      this.ads.sort((x,y)=>new Date(y.adCreated).getTime()-new Date(x.adCreated).getTime());
    }else{
      this.ads.sort((x,y)=>y.views-x.views);
    }
    console.log(this.ads);
  }

  ngOnInit(): void {
    this.searchService.searchKeyword.subscribe(item => this.searchKeyword = item);
    this.adService.getAds().subscribe(adList => {
      console.log(adList);
      this.ads = adList;this.ads.sort((x,y)=>new Date(y.adCreated).getTime()-new Date(x.adCreated).getTime());
    });
    this.categoryService.getCategories().subscribe(categoryList => this.categories = categoryList);
  }
}
