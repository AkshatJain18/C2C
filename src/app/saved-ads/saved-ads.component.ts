import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/models/Ad';
import { User } from 'src/models/User';
import { DataService } from 'src/services/data.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-saved-ads',
  templateUrl: './saved-ads.component.html',
  styleUrls: ['./saved-ads.component.scss']
})
export class SavedAdsComponent implements OnInit {

  savedAds:Ad[]=[];
  user!:User;
  isLoading:boolean = true;

  constructor(private dataService:DataService,private userService:UserService) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  setAd(ad:Ad){
    this.dataService.setAd(ad);
    return true;
  }

  ngOnInit(): void {
    this.userService.getSavedAdsByUserId(this.user.id).subscribe((savedAds)=>{
      this.savedAds = savedAds;
      this.isLoading = false;
    });
  }

}
