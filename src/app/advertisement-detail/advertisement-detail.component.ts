import { Unary } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { AdService } from 'src/services/ad.service';
import { CategoryService } from 'src/services/category.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-advertisement-detail',
  templateUrl: './advertisement-detail.component.html',
  styleUrls: ['./advertisement-detail.component.scss']
})
export class AdvertisementDetailComponent implements OnInit {

  slideConfig = {  
    "slidesToShow": 3,  
    "slidesToScroll": 3,  
    "dots": true,  
    "infinite": true  
  }; 

  adId!:string;
  ad!:Ad;
  seller!:User;
  category!:any;

  constructor(private adService:AdService,private userService:UserService,private categoryService:CategoryService,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.adId = params.get('adId') as string; 
    });
  }

  ngOnInit(): void {
    this.adService.getAdById(this.adId).subscribe(adItem => {
      this.ad = adItem;
      console.log(this.ad);
      this.categoryService.getCategories().subscribe((categories)=>{
         this.category =  categories.find((c:any)=>c.categoryId == this.ad.categoryId);
      })
      this.userService.getUserById(this.ad.sellerId).subscribe(userItem => this.seller = userItem);
    });

    this.adService.postAdView(this.adId).subscribe();
  }
}
