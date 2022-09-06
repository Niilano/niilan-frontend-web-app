import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingpageComponent } from './landingpage/landingpage.component';
import { AuthenticateusersComponent } from './authenticateusers/authenticateusers.component';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';

const routes: Routes = [
{path : 'home' , component: LandingpageComponent },
{path : 'login' , component : AuthenticateusersComponent },
{ path : 'register' , component : AuthenticateusersComponent },

{ path: 'cars', component: CarsComponent},
{ path: 'cars/:carsId', component: CarDetailsComponent},

{ path: '' , component: LandingpageComponent }  
// {path : '' , redirectTo: 'home' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
