import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/models/advertisement';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.scss']
})
export class AdvertisementListComponent implements OnInit {

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
    },
    {
      title:'Table',
      initialPrice:1000
    },
    {
      title:'Table',
      initialPrice:1000
    }
  ];

  startPrice: number = 500;
  endPrice: number = 100000;
  options: Options = {
    floor: 500,
    ceil: 100000,
    step: 1000,
    showTicks: true
  };

  isBuy:boolean;
  
  constructor() {
    this.isBuy = true;
  }

  changeTab(){
    this.isBuy = !this.isBuy;
  }

  ngOnInit(): void {

  }
}
