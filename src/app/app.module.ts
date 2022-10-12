import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { Landingpage2Component } from './landingpage2/landingpage2.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { SortComponent } from './sort/sort.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DashHeaderComponent } from './dash-header/dash-header.component';
import { OverviewComponent } from './overview/overview.component';
import { ProfileComponent } from './profile/profile.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';

import { NgxDropzoneModule } from 'ngx-dropzone';
import {CloudinaryModule} from '@cloudinary/ng';

// import { NgbdCarouselPause } from './carousel-pause';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    AuthenticateusersComponent,
    CarsComponent,
    CarDetailsComponent,
    ListCarComponent,
    ManageListingsComponent,
    Landingpage2Component,
    HeaderComponent,
    FooterComponent,
    SortComponent,
    DashboardComponent,
    DashHeaderComponent,
    OverviewComponent,
    ProfileComponent,
    ApprovalsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTableModule,
    MatBadgeModule,
    NgxDropzoneModule,
    CloudinaryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
