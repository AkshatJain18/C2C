import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementDetailComponent } from './advertisement-detail/advertisement-detail.component';
import { FilterPipe } from 'src/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { AdCardComponent } from './ad-card/ad-card.component';
import { AdDetailedCardComponent } from './ad-detailed-card/ad-detailed-card.component';
import { SavedAdsComponent } from './saved-ads/saved-ads.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CarouselComponent,
    SignUpComponent,
    CreateAdComponent,
    HomepageComponent,
    TopNavComponent,
    AdvertisementListComponent,
    AdvertisementDetailComponent,
    FilterPipe,
    AdCardComponent,
    AdDetailedCardComponent,
    SavedAdsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    NgxSliderModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
