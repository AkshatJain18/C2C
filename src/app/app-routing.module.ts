import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAdComponent } from './create-ad/create-ad.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdvertisementDetailComponent } from './advertisement-detail/advertisement-detail.component';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CarouselComponent } from './carousel/carousel.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'ads', component: AdvertisementListComponent},
  { path: 'ads/:adId', component: AdvertisementDetailComponent},
  {path: 'sign-in', component: SignInComponent},
  {path:'sign-up', component: SignUpComponent},
  {path:'create-ad', component: CreateAdComponent},
  {path:'carousel', component: CarouselComponent},
  { path: '**', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
