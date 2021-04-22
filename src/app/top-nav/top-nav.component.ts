import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Advertisement } from 'src/models/Advertisement';
import { AdService } from 'src/services/ad.service';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  searchKeyword!:string;
  ads!:Advertisement[];
  isSearchInputVisible!:boolean;

  constructor(private adService:AdService,private searchService:SearchService,private router:Router) { }

  search(){
    if(this.searchKeyword==""){
      return;
    }
    const index = this.ads.findIndex(
      ad => ad.productName.toLowerCase().includes(this.searchKeyword) 
    );

    if(index!=-1){
      this.router.navigateByUrl('/ads');
    }
  }

  updateKeyword(){
    this.searchService.setKeyword(this.searchKeyword);
    this.search();
  }

  ngOnInit(): void {
    this.adService.getAds().subscribe((list : Advertisement[])=>{
      this.ads = list;
    });
  }

}
