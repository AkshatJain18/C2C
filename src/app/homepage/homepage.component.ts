import { Component, OnInit } from '@angular/core';
import { Options } from "@angular-slider/ngx-slider";
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Advertisement } from 'src/models/advertisement';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  ads:Advertisement[] = [
    {
      title:'Car',
      initialPrice:1000
    },
    {
      title:'Bike',
      initialPrice:1000
    },
    {
      title:'Car',
      initialPrice:1000
    },
    {
      title:'Table',
      initialPrice:1000
    }
  ];
  
  constructor(config: NgbCarouselConfig) {  
    config.interval = 2500;  
    config.keyboard = false;  
    config.pauseOnHover = false;
    config.showNavigationIndicators = false;
  }  

  ngOnInit(): void {

  }

}
