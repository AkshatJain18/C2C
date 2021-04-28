import { Injectable } from '@angular/core';
import { Ad } from 'src/models/Ad';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  ad!:Ad;

  constructor() { 
    
  }

  setAd(ad:Ad){
    this.ad = ad;
  }
  
  getAd(){
    return this.ad;
  }
}
