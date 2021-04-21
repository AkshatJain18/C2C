import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementListComponent } from './advertisement-list/advertisement-list.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'ads', component: AdvertisementListComponent},
  { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
