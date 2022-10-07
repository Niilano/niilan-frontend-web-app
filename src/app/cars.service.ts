import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  getAllCars(){
    return this.http.get(`${environment.apiKey}listings/getListings`)
  }

  getOneCar(index:any){
    return this.http.get(`${environment.apiKey}listings/getListings/${index+1}`)
  }

  sortCarsByRegion(region:any){
    return this.http.get(`${environment.apiKey}listings/sortListingsByRegion/${region}`)
  }

  sortCars(brand:any,type:any,price:any){
    // listings/sortListings/
    return this.http.get(`${environment.apiKey}listings/sortListings/${brand}/${type}/${price}`)
  }

  constructor( private http: HttpClient ) { }

}
