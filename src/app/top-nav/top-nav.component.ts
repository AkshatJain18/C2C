import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Ad } from 'src/models/Ad';
import { AdService } from 'src/services/ad.service';
import { NavbarService } from 'src/services/navbar.service';
import { SearchService } from 'src/services/search.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  searchKeyword!:string;
  ads!:Ad[];
  isSearchInputVisible!:boolean;
  isLoggedIn!:boolean;

  constructor(private adService:AdService,private searchService:SearchService,private router:Router) {
    this.isLoggedIn = localStorage.getItem('user')!=null;
    console.log(localStorage.getItem('user'));
  }

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

  onLogOutClick(){
    localStorage.clear();
  }

  onCreateAdClick(){
    if(this.isLoggedIn){
      this.router.navigateByUrl('/create-ad');
    }else{
      this.router.navigateByUrl('/sign-in');
    }
  }

  updateKeyword(){
    this.searchService.setKeyword(this.searchKeyword);
    this.search();
  }

  ngOnInit(): void {
    this.adService.getAds().subscribe((list : Ad[])=>{
      this.ads = list;
    });
  }

}
