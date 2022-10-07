import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingpageComponent } from './landingpage/landingpage.component';
import { AuthenticateusersComponent } from './authenticateusers/authenticateusers.component';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ListCarComponent } from './list-car/list-car.component';
import { ManageListingsComponent } from './manage-listings/manage-listings.component';
import { Landingpage2Component } from './landingpage2/landingpage2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
{path : 'home' , component: LandingpageComponent },
{path : 'login' , component : AuthenticateusersComponent },
{ path : 'register' , component : AuthenticateusersComponent },

{ path: 'cars', component: CarsComponent},
{ path: 'cars/details/:carsId', component: CarDetailsComponent},
{ path: 'cars/region/:region', component: CarsComponent},
{ path: 'cars/sort/:brand/:type/:price', component: CarsComponent},
{ path: 'list-cars', component: ListCarComponent },
{ path: 'manage', component: ManageListingsComponent },
{ path: 'manage/:id', component: ManageListingsComponent },
{ path: 'dashboard', component: DashboardComponent,
children:[
  {path:'overview',component: OverviewComponent},
  {path:'list-car',component: ListCarComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'manage-listings', component: ManageListingsComponent },
  {path:'',component: OverviewComponent}

]
},

{ path: '' , component: Landingpage2Component }  
// {path : '' , redirectTo: 'home' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
