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
import { ApprovalsComponent } from './approvals/approvals.component';
import { Page404Component } from './page404/page404.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PropertyListingComponent } from './property-listing/property-listing.component';
import { ControlsComponent } from './Admin/controls/controls.component';
import { UsersComponent } from './Admin/users/users.component';
import { ListingsComponent } from './Admin/listings/listings.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { BroadcastMessageComponent } from './Admin/broadcast-message/broadcast-message.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
{path : 'home' , component: Landingpage2Component },
{path : 'login' , component : AuthenticateusersComponent },
{ path : 'register' , component : AuthenticateusersComponent },
{ path : 'terms-of-service' , component : TermsComponent },

{ path: 'cars', component: CarsComponent},
{ path: 'cars/details/:carsId', component: CarDetailsComponent},
{ path: 'cars/region/:region', component: CarsComponent},
{ path: 'cars/sort/:brand/:type', component: CarsComponent},
{ path: 'list', component: PropertyListingComponent },
{ path: 'list/:category', component: PropertyListingComponent },
{ path: 'list-cars', component: ListCarComponent },
{ path: 'manage', component: ManageListingsComponent },
{ path: 'manage/:id', component: ManageListingsComponent },
{ path: 'dashboard', component: DashboardComponent,
children:[
  {path:'admin',component: AdminComponent,
children:[
  {path:'users',component: UsersComponent},
  {path:'users/:id',component: UsersComponent},
  {path:'listings',component: ListingsComponent},
  {path:'broadcast',component: BroadcastMessageComponent},
  {path:'broadcast/:channel',component: BroadcastMessageComponent},
  {path:'',component: ControlsComponent}
]
},

  {path:'approvals',component: ApprovalsComponent},
  {path:'overview',component: OverviewComponent},
  {path:'list-car',component: ListCarComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'manage-listings', component: ManageListingsComponent },
  { path: 'manage-listings/:id', component: ManageListingsComponent },
  {path:'',component: OverviewComponent}

]
},

{path:'contact-us',component: ContactusComponent},
{path:'404',component: Page404Component},

{ path: '' , component: Landingpage2Component },
{path:'**',component: Page404Component}
// {path : '' , redirectTo: 'home' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
