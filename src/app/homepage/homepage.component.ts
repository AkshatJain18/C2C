import { Component, OnInit } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Advertisement } from 'src/models/Advertisement';
import { AwsCloudMapServiceDiscovery } from 'aws-sdk/clients/appmesh';
import { AdService } from 'src/services/ad.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  ads:Advertisement[] = [];
  
  constructor(config: NgbCarouselConfig,private adService:AdService) {  
    config.interval = 2500;  
    config.keyboard = false;  
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
  }  

  ngOnInit(): void {
    this.adService.getAds().subscribe(adList => this.ads = adList);
  }

}
