import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AuthenticateusersComponent } from './authenticateusers/authenticateusers.component';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListCarComponent } from './list-car/list-car.component';
import { ManageListingsComponent } from './manage-listings/manage-listings.component';

// import { NgbdCarouselPause } from './carousel-pause';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    AuthenticateusersComponent,
    CarsComponent,
    CarDetailsComponent,
    ListCarComponent,
    ManageListingsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
