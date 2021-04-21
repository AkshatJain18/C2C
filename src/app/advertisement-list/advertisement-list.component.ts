import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/models/Advertisement';
import { AdService } from 'src/services/ad.service';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.scss']
})
export class AdvertisementListComponent implements OnInit {

  startPrice: number = 500;
  endPrice: number = 100000;
  options: Options = {
    floor: 500,
    ceil: 100000,
    step: 1000,
    showTicks: true
  };

  adType:number;

  ads: Advertisement[] = [];
  selectedCategories:any[] = [];
  categories:any[] = [];
  
  constructor(private adService:AdService,private categoryService:CategoryService) {
    this.adType = 1;
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

  checkCategoryFilter(ad:Advertisement){
    const shouldExist:boolean = this.selectedCategories.includes(ad.categoryId) || this.selectedCategories.length==0;
    console.log(shouldExist);
    return shouldExist;
  }

  sortByTime(){
    this.ads.sort();
  }

  sortByViews(){

  }

  ngOnInit(): void {
    this.adService.getAds().subscribe(adList => this.ads = adList);
    this.categoryService.getCategories().subscribe(categoryList => this.categories = categoryList);
  }
}
