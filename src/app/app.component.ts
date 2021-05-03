import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'c2c-marketplace';

  constructor(public nav:NavbarService,private router:Router){
    router.events.subscribe(()=>{
      console.log(this.router.url);
      if(this.router.url == '/sign-in' || this.router.url == '/sign-up'){
        this.nav.hide();
      }else{
        this.nav.show();
      }
    });
  }

  @HostListener('click')
  clicked(){
    console.log("clicked!");
  }
}
