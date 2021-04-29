import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-slideout-panel',
  templateUrl: './slideout-panel.component.html',
  styleUrls: ['./slideout-panel.component.scss']
})
export class SlideoutPanelComponent implements OnInit {

  currentTab!:number;

  constructor(private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.paramMap.subscribe(params => {
      this.currentTab = parseInt(params.get('actionNo')!); 
    });
  }

  setCurrentTab(tab:number){
    this.currentTab = tab;
  }

  ngOnInit(): void {
  }
}
