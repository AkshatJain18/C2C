import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementDetailComponent } from './advertisement-detail/advertisement-detail.component';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// import { SavedAdsComponent } from './saved-ads/saved-ads.component';
// import { MyAdsComponent } from './my-ads/my-ads.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HelpComponent } from './help/help.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SlideoutPanelComponent } from './slideout-panel/slideout-panel.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'ads', component: AdvertisementListComponent},
  { path: 'ads/category/:categoryId', component: AdvertisementListComponent},
  { path: 'ads/:adId', component: AdvertisementDetailComponent},
  {path: 'sign-in', component: SignInComponent},
  {path:'sign-up', component: SignUpComponent},
  {path:'create-ad', component: CreateAdComponent},
  {path:'my-stats/action/:actionNo', component: SlideoutPanelComponent},
  {path:'profile/:id', component: ViewProfileComponent},
  { path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
