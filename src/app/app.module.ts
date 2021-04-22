import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import { AdvertisementDetailComponent } from './advertisement-detail/advertisement-detail.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import { FilterPipe } from 'src/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TopNavComponent,
    SideNavComponent,
    AdvertisementListComponent,
    AdvertisementDetailComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule,
    NgbModule,
    HttpClientModule,
    SlickCarouselModule,
    NgImageSliderModule,
    FormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
