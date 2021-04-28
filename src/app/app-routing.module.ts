import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementDetailComponent } from './advertisement-detail/advertisement-detail.component';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SavedAdsComponent } from './saved-ads/saved-ads.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'ads', component: AdvertisementListComponent},
  { path: 'ads/:adId', component: AdvertisementDetailComponent},
  {path: 'sign-in', component: SignInComponent},
  {path:'sign-up', component: SignUpComponent},
  {path:'create-ad', component: CreateAdComponent},
  {path:'saved-ads', component: SavedAdsComponent},
  { path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
